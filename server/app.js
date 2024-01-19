import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'

// Load environment variables from a .env file
dotenv.config()

// Create an instance of the Express application
const app = express()

//cookies and filemiddleware
app.use(cookieParser())

// morgan middlewares
import morgan from 'morgan'
app.use(morgan('tiny'))

// regular middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// import all routes here
import userRoutes from './routes/userRoutes.js'

// router middleware
app.use('/api/v1', userRoutes)

export default app
