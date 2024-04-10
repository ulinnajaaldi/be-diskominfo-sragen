import express, { Application } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { routes } from './routes'
import { logger } from './utils/logger'
import { CORS_ORIGIN, DB_URL, PORT } from './constants/config'

const app: Application = express()

if (!DB_URL || !PORT) {
  throw new Error('Environment variables DB_URL and PORT must be defined')
}

mongoose.connect(DB_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('connected', () => console.log('Connected to Database'))

// parser body handler
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// cors
const corsOptions = {
  origin: `${CORS_ORIGIN}`
}
app.use(cors(corsOptions))

routes(app)

app.listen(PORT, () => {
  logger.info(`server is listening in port http://localhost:${PORT}`)
})
