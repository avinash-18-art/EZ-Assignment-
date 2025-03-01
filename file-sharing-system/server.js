require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')

const app = express()
connectDB()

app.use(express.json())
app.use('/auth', require('./routes/authRoutes'))
app.use('/files', require('./routes/fileRoutes'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
