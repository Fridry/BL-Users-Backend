import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'

dotenv.config()

import { connectDB } from './database'
import routes from './routes'

const app = express()
connectDB()

app.use(express.json())
app.use(cors())
app.use(routes)

export default app