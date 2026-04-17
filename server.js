const express = require('express')
const dotenv = require('dotenv').config()
const errorHandler = require("./middleware/errorHandler")
const connectDB = require('./config/dbConnection')
const cors = require('cors');

const app = express()
connectDB()

// CORS fix
app.use(cors({
  origin: function(origin, callback) {
    const allowed = process.env.ALLOWED_ORIGIN?.split(',') || [];
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Handle preflight
app.options('*', cors());

const port = process.env.PORT || 5000 

app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})