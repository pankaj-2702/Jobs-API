require('dotenv').config()
const authentication = require('./middleware/authentication')
const express = require('express')
const app = express()
const errorHandlerMiddleware = require('./middleware/error-handler')

//connect to DATABASE
const connectBD = require('./db/connectDB')
//
app.use(express.json())

// Auth Router 
const AuthRoute = require('./Route/auth')

app.use('/api/v1/auth',AuthRoute)

// Jobs Router 
const JobsRoute = require('./Route/jobs')

app.use('/api/v1/jobs', authentication,JobsRoute)

app.use(errorHandlerMiddleware)
const port = 3000;
const start = async ()  =>{
    try{
        await connectBD(process.env.MONGO_URI)
        app.listen(port,console.log(`Port is listening at ${port}`))
    }catch(err){
        console.log(err)
    }
}
start()