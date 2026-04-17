const express = require('express')
const dotenv = require('dotenv').config()
const errorHandler = require("./middleware/errorHandler")
const connectDB = require('./config/dbConnection')
const cors = require('cors');

const app = express()
connectDB()
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Handle preflight requests
// app.options('/(.*)', cors()); 
const port = process.env.PORT 
//to parse the json file from the request body 
app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
//to handle errors 
app.use(errorHandler)

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
    console.log(`ALLOWED_ORIGIN is: ${process.env.ALLOWED_ORIGIN}`) // debug line
})
