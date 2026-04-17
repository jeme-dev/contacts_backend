const express = require('express')
const dotenv = require('dotenv').config()
const errorHandler = require("./middleware/errorHandler")
const connectDB = require('./config/dbConnection')
const cors = require('cors');

const app = express()
connectDB()
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  allowedHeaders: ["Content-Type", "Authorization"] 
}));

const port = process.env.PORT || 5000 
//to parse the json file from the request body 
app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
//to handle errors 
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})
