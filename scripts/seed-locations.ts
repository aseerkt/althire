import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline'
import cliProgress from 'cli-progress'
import yauzl from 'yauzl'
import { prisma } from '@/prisma/client'

type LocationInput = {
  id: string
  city: string
  region: string
  country: string
  countryCode: string
}

const DATA_DIR = path.join(process.cwd(), 'geonames')
const BATCH_SIZE = 300
const MIN_POPULATION = 10_000

const GEO_URLS = {
  IN: 'https://download.geonames.org/export/dump/IN.zip',
  US: 'https://download.geonames.org/export/dump/US.zip',
  ADMIN: 'https://download.geonames.org/export/dump/admin1CodesASCII.txt',
}

const COUNTRY_NAME: Record<string, string> = {
  IN: 'India',
  US: 'United States',
}

fs.mkdirSync(DATA_DIR, { recursive: true })

/* ------------------ logging ------------------ */

function log(msg: string) {
  console.log(`[${new Date().toISOString()}] ${msg}`)
}

/* ------------------ download ------------------ */

async function download(url: string, out: string) {
  if (fs.existsSync(out)) {
    log(`⬇️  Using cached ${path.basename(out)}`)
    return
  }
  log(`⬇️  Downloading ${url}`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed: ${url}`)
  fs.writeFileSync(out, Buffer.from(await res.arrayBuffer()))
}

/* ------------------ admin map ------------------ */

function loadAdminMap(): Map<string, string> {
  const file = fs.readFileSync(
    path.join(DATA_DIR, 'admin1CodesASCII.txt'),
    'utf8',
  )

  const map = new Map<string, string>()
  for (const line of file.split('\n')) {
    if (!line.trim()) continue
    const [code, name] = line.split('\t')
    map.set(code, name)
  }
  return map
}

/* ------------------ count lines (for progress) ------------------ */

async function countLinesInZip(zipPath: string): Promise<number> {
  let count = 0

  return new Promise((resolve, reject) => {
    yauzl.open(zipPath, { lazyEntries: true }, (err, zip) => {
      if (err || !zip) return reject(err)

      zip.readEntry()
      zip.on('entry', (entry) => {
        if (!entry.fileName.endsWith('.txt')) {
          zip.readEntry()
          return
        }

        zip.openReadStream(entry, (err, stream) => {
          if (err || !stream) return reject(err)

          const rl = readline.createInterface({ input: stream })
          rl.on('line', () => count++)
          rl.on('close', () => zip.readEntry())
        })
      })

      zip.on('end', () => resolve(count))
      zip.on('error', reject)
    })
  })
}

/* ------------------ seed zip ------------------ */

async function seedZip(zipPath: string, adminMap: Map<string, string>) {
  const countryCode = path.basename(zipPath, '.zip')
  const country = COUNTRY_NAME[countryCode]

  log(`🌍 Preparing ${country}`)

  const totalLines = await countLinesInZip(zipPath)

  const bar = new cliProgress.SingleBar(
    {
      format:
        `${country} |{bar}| {percentage}% ` +
        `| processed: {processed} ` +
        `| inserted: {inserted} ` +
        `| skipped: {skipped}`,
      hideCursor: true,
    },
    cliProgress.Presets.shades_classic,
  )

  bar.start(totalLines, 0, {
    processed: 0,
    inserted: 0,
    skipped: 0,
  })

  let batch: LocationInput[] = []
  let processed = 0
  let inserted = 0
  let skipped = 0
  let active = 0
  let ended = false

  const seen = new Set<string>()
  let flushing: Promise<void> | null = null

  const flush = async () => {
    if (!batch.length) return
    if (flushing) await flushing

    const data = batch
    batch = []

    flushing = (async () => {
      const result = await prisma.location.createMany({
        data,
        skipDuplicates: true,
      })
      inserted += result.count
    })()

    await flushing
    flushing = null
  }

  return new Promise<void>((resolve, reject) => {
    const maybeResolve = () => {
      if (ended && active === 0) {
        bar.stop()
        log(
          `✅ ${country}: processed=${processed}, inserted=${inserted}, skipped=${skipped}`,
        )
        resolve()
      }
    }

    yauzl.open(zipPath, { lazyEntries: true }, (err, zip) => {
      if (err || !zip) return reject(err)

      zip.readEntry()

      zip.on('entry', (entry) => {
        if (!entry.fileName.endsWith('.txt')) {
          zip.readEntry()
          return
        }

        zip.openReadStream(entry, (err, stream) => {
          if (err || !stream) return reject(err)

          const rl = readline.createInterface({ input: stream })

          rl.on('line', async (line) => {
            rl.pause()
            active++
            async function seedLine() {
              processed++

              if (!line.trim()) {
                skipped++
                bar.increment(1, { processed, inserted, skipped })
                rl.resume()
                return
              }

              const cols = line.split('\t')
              const city = cols[1]
              const admin1 = cols[10]
              const population = Number(cols[14] || 0)

              if (population < MIN_POPULATION) {
                skipped++
                bar.increment(1, { processed, inserted, skipped })
                rl.resume()
                return
              }

              const region = adminMap.get(`${countryCode}.${admin1}`)
              if (!region) {
                skipped++
                bar.increment(1, { processed, inserted, skipped })
                rl.resume()
                return
              }

              const key = `${city}|${region}|${countryCode}`
              if (seen.has(key)) {
                skipped++
                bar.increment(1, { processed, inserted, skipped })
                rl.resume()
                return
              }
              seen.add(key)

              batch.push({
                id: randomUUID(),
                city,
                region,
                country,
                countryCode,
              })

              if (batch.length >= BATCH_SIZE) {
                await flush()
              }
            }

            seedLine()
              .catch(reject)
              .finally(() => {
                bar.increment(1, { processed, inserted, skipped })
                active--
                rl.resume()
                maybeResolve()
              })
          })

          rl.on('close', async () => {
            await flush()
            zip.readEntry()
          })
        })
      })

      zip.on('end', () => {
        ended = true
        maybeResolve()
      })

      zip.on('error', reject)
    })
  })
}

/* ------------------ main ------------------ */

async function main() {
  log('🧹 Deleting preivous location seeds')
  await prisma.location.deleteMany()
  log('🚀 Starting location seeding')

  await download(GEO_URLS.IN, path.join(DATA_DIR, 'IN.zip'))
  await download(GEO_URLS.US, path.join(DATA_DIR, 'US.zip'))
  await download(GEO_URLS.ADMIN, path.join(DATA_DIR, 'admin1CodesASCII.txt'))

  const adminMap = loadAdminMap()

  await seedZip(path.join(DATA_DIR, 'IN.zip'), adminMap)
  await seedZip(path.join(DATA_DIR, 'US.zip'), adminMap)

  await prisma.$disconnect()

  log('🎉 Location seeding completed')
}

main().catch(async (err) => {
  console.error(err)
  await prisma.$disconnect()
  process.exit(1)
})
