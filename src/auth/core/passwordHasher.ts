import crypto from 'node:crypto'

export const hashPassword = async (
  password: string,
  salt: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (err, hash) => {
      if (err) reject(err)
      else resolve(hash.toString('hex'))
    })
  })
}

export const generateSalt = (length: number = 16): string => {
  return crypto.randomBytes(length).toString('hex').normalize()
}

export const verifyPassword = async (
  password: string,
  salt: string,
  hash: string,
): Promise<boolean> => {
  const hashedPassword = await hashPassword(password, salt)
  return crypto.timingSafeEqual(
    Buffer.from(hashedPassword, 'hex'),
    Buffer.from(hash, 'hex'),
  )
}
