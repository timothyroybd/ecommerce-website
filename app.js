//PACKAGES
    //"mongodb://0.0.0.0:27017/test"
require('dotenv').config()
    
const mongoose = require('mongoose')
const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

//LOCAL PACKAGES
const authRoutes = require("./routes/auth")

//MIDDLEWARE
 app.use(bodyParser.json)
 app.use(cookieParser())
 app.use(cors())

//CONNECTING TO MONGODB
mongoose.connect(process.env.DATABASE, {
useNewUrlParser: true,    
useUnifiedTopology: true,
useCreateIndex:true
}).then(() => {
    console.log(`DB CONNECTED!!!!!`)
    
 })

//PORT
const port = process.env.port || 8000;
//STARTING A SERVER
app.listen(port, ()=> {
    console.log(`app is running at ${port}`)
})

//ROUTES
app.use("/api", authRoutes)
