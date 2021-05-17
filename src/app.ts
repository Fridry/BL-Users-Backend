import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

import { connectDB } from './database'
import routes from './routes'

const app = express()
connectDB()

app.use(express.json())
app.use(routes)

export default app