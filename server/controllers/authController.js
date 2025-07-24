const bcrypt=require("bcrypt")
const User=require("../modles/User")
const jwt = require("jsonwebtoken")
const login = async(req,res)=>{
    const {userName,password}=req.body
    
    if(!userName||!password)
        return res.status(400).json({message:"All fields are required"})
    
    const foundedUser=await User.findOne({userName:userName}).lean()
    
    if(!foundedUser||!foundedUser.active)
        return res.status(401).json({message:"Unathourized"})
    const match= await bcrypt.compare(password,foundedUser.password)

    if(!match)
        return res.status(401).json({message:"Unathourized"})
    const userInfo={
        _id:foundedUser._id,
        name:foundedUser.name,
        userName:foundedUser.userName,
        roles:foundedUser.roles,
        email:foundedUser.email
    }

const accessToken =jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)

    res.json(accessToken)
}
const register = async(req,res)=>{
    const{userName,password,name,email,phone}=req.body
    if(!userName||!password||!name||!email||!phone)
        return res.status(400).json({message:"All fields are required"})
    const duplicateUser = await User.findOne({userName:userName}).lean()
    
    if(duplicateUser)
        return res.status(409).json({message:"Duplicate user"})
    
    const hashPassword=await bcrypt.hash(password,10)
    const user = await User.create({userName,password:hashPassword,name,email,phone})
    if(!user)
        return res.status(400).json({message:"Bad request"})
    res.json({message:`User ${user.name} created`})
}
module.exports={login,register}