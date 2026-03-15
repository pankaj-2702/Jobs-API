const User = require('../model/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {Unauth} = require('../errors')

const authentication = (req,res,next)=>{

     const authHeader = req.headers.authorization
     
     if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new Unauth('Authentication invalid')
     }

     const token = authHeader.split(' ')[1];

     try {
        const playload = jwt.verify(token,process.env.JWT_SECRET)
       
        const user = User.findById(playload.id).select('-password')

        req.user = user
        req.user = {userId : playload.userID , name : playload.name}
         //console.log(req.user)
        next()
        
     } catch (error) {
         throw new Unauth('Authentication invalid')
     }

}

module.exports = authentication