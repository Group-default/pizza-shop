import 'dotenv/config'
import { z } from 'zod'

console.log(process.env.DATABASE_URL)

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
    PORT: z.coerce.number().default(3001),
    JWT_SECRET: z.string(),
    DATABASE_URL: z.string(),
    CLIENT_ID: z.string(),
    CLIENT_SECRET: z.string(),
    EFIPAY_CERT: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error('Invalid environment variables', _env.error.format())
    throw new Error('Invalid environment variables')
}

export const env = _env.data