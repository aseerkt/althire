import Redis from 'ioredis'
import { env } from '@/data/env'

// Redis client

export const redis = new Redis(env.REDIS_PORT, env.REDIS_HOST)
