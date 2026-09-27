const userModel = require("../src/models/user.model")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const TokenBlacklistModel = require("../models/blacklist.model");

/** 
/** 
 * @name = ragisterr user constrol
 * @description = 
 * @access = public
 */
 async function registerUserControl(req,res){
   
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username, email and password"
    });
  }

const isUserAlreadyExsist = await userModel.findOne({
    $or: [{username},{email}]
})
if(isUserAlreadyExsist){
  return res.status(400).json({
    message: "account already have acces go login and use"
  })
}

const hash =  await bcryptjs.hash(password,10)
const user = await userModel.create({
  username,
  email,
  password:hash



})
  const token = jwt.sign(
    {id: user._id,username: user.username,},
    process.env.JWT_SECRET,
    {expiresIn:"2d"}
  )
  res.cookie("token",token)

  res.status(201).json({

    message: "user ragister succesfully",
    user : {

      id:user._id,
      username:user.username,
      email:user.email


    },


  })




  
 }


 /**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */


async function loginUserController(req, res) {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {return res.status(400).json({
        message: "Invalid email or password"
        
        


      })


    }


    const isPassValid = await bcryptjs.compare(password,user.password)
    if(!isPassValid){
      return res.status(400).json({
        message: "inavlid",



      })



    }


     const token = jwt.sign(
    {id: user._id,username: user.username,},
    process.env.JWT_SECRET,
    {expiresIn:"2d"}


  )


  res.cookie("token",token)
    res.status(200).json({
      message: "user loggedin suceesful",
      user:{
      id:user._id,
      username:user.username,
      email:user.email   

    } 


    })


  }
 
async function LogoutUserController(req,res){
  const token = req.cookie.token
  if(token){
    await TokenBlacklistModel.create({token})
  }
  res.clearcookie("token")
  res.status(200).json({
    message:"logout suceesfuly"

  })
} 
/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
async function logoutUserController(req, res) {
  const token = req.cookies?.token;

  if (token) {
    await TokenBlacklistModel.create({ token });
  }

  res.clearCookie("token");
  return res.status(200).json({
    message: "logout successful"
  });
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */
async function getMeController(req, res) { 
  const user = await userModel.findById(req.user.id)
  res.status(200).json({
    message: "User details fetched successfully",
    user: {
        id: user._id,
        username: user.username,
        email: user.email
    }
})
}




 module.exports = {
   registerUserControl,
   loginUserController,
   LogoutUserController,
   getMeController
 }                