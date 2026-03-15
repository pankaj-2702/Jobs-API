const {BadRequestError , Unauth} = require('../errors/index')
const User = require('../model/user')
const {StatusCodes} = require('http-status-codes')

const register = async (req , res) => {
  const {name , email, password} = req.body

  if(!name || !email || !password){
    throw new BadRequestError('Please Provide name, email and password');
  }

  
   const user = await User.create(req.body)
   const token = user.createJWT()
   res.status(StatusCodes.CREATED).json({user:{name : user.name},token})
}
const login = async (req , res) => {

     const {email,password } = req.body

     if(!email || !password){
      throw new BadRequestError('Please provide Email and Password')
     }
     const user = await User.findOne({email})
     
     if(!user){
      throw new Unauth('Invalid credentials')
     }

     const isPasswordCorrect = await user.comparePassword(password)
     if(!isPasswordCorrect){
      throw new Unauth('Invalid credentials')
     }
     const token = user.createJWT();
     res.status(StatusCodes.OK).json({user:{name:user.name} , token : token})
 
}

module.exports ={
    register,
    login
}