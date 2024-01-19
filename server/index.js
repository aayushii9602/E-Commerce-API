import app from './app.js'

import { connectDB } from './config/db.js'

// Defining the port to listen on, using the environment variable PORT or defaulting to 2000
const PORT = process.env.PORT || 2000

// Connecting to the database
connectDB()

// Starting the server to listen on the specified port
app.listen(PORT, () => {
  console.log(`Listeing on the port:${PORT}`)
})
