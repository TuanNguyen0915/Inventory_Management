import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// connect mongoDB
import './config/database.js'

const app = express()
const port = process.env.PORT || 3001

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors())

app.get('/', (req,res) => {
  res.send('Server is running')
})

app.listen(port,()=> {
  console.log(`Server is running on port ${port}`)
})