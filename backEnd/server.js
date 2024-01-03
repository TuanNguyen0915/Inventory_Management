import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// connect mongoDB
import './config/database.js'

// import routes
import { router as userRouter } from './routes/userRoute.js'

const app = express()
const port = process.env.PORT || 3001

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors())

// Use routers
app.use('/api/user', userRouter)


app.listen(port,()=> {
  console.log(`Server is running on port ${port}`)
})