import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// Defining the MongoDB connection URL using the provided environment variable or a default URL
const MONGO_URL = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017/ecommerce'

// Establishing a connection to the MongoDB database
export const connectDB = mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('DB Connected Succesfully....'))
  .catch((err) => {
    console.log('DB Connection Failed!')
    console.log(err)
    process.exit(1)
  })

export default connectDB
