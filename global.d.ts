import type mongoose from 'mongoose'

declare global {
  var mongo: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}
