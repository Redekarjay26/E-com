import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/index.js'
import connectDB from './config/db.js'
import { globalErrHandler, notFound } from './middlewares/globalErrHandler.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
//database
connectDB()
const PORT = process.env.PORT || 5000

app.use('/', router)

app.use(notFound)
app.use(globalErrHandler)

app.listen(PORT, () => {
  console.log(`server connected on ${PORT}`)
})
