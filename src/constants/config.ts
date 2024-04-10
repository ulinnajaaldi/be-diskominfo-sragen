import dotenv from 'dotenv'
dotenv.config()

export const DB_URL = process.env.DATABASE_URL
export const PORT = process.env.PORT
export const IMGBB_API_KEY = process.env.IMGBB_API_KEY
export const JWT_SECRET = process.env.JWT_SECRET
export const CORS_ORIGIN = process.env.CORS_ORIGIN
