const user = require('../Models/User')
const jwt = require('jsonwebtoken')
const Errorhandler = require('../Utils/Errorhandler')
const catchAsyncErrors = require('../Middlewares/CatchAsyncError')


exports.isAuthenticateUser =catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new Errorhandler('Login First to access this resource'))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await user.findById(decoded.id)
    next();
})


exports.AuthorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new Errorhandler(`Role ${req.user.role} is not allowed to access this resource`,403))
        }
        next()
    }
}