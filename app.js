//====== DECLARING PACKAGES ==========

require('dotenv').config()
const mongoose = require('mongoose')
const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

//======CONNECTING TO MONGODB ======
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,    
    useUnifiedTopology: true,
    useCreateIndex:true
    }).then(() => {
        console.log(`DB CONNECTED!!!!!`)
        
     })

//======LOCAL PACKAGES ======
const authRoutes = require("./routes/auth")



 //====== MIDDLEWARE ======
 app.use(bodyParser.json())
 app.use(cookieParser())
 app.use(cors())

 
// ======PORT ======
const port = process.env.PORT || 8000;
//====== STARTING A SERVER ======
app.listen(port, ()=> {
    console.log(`app is running at ${port}`)
})

 //ROUTES
app.use("/api", authRoutes)



