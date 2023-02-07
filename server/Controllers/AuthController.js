const User = require('../Models/User')
const Errrohandler = require('../Utils/Errorhandler')
const catchAsyncErrors = require('../Middlewares/CatchAsyncError')
const ApiFeatures = require('../Utils/ApiFeatures')
const jwt = require('jsonwebtoken')
const sendToken = require('../Utils/sentToken')
const express = require('express')
const crypto = require('crypto')
const sentToken = require('../Utils/sentToken')
const cloudinary = require('cloudinary')

// Registraion of the user. 
exports.Register_User = catchAsyncErrors(async(req,res,next)=>{

    // const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
    //     folder:"avatars",
    //     width:150,
    //     crop:"scale"
    // })
    const { name, email, gender, password } = req.body;

    const user = await User.create({
        name,
        email,
        gender,
        password,
        // avatar:{
        //     public_id:mycloud.public_id,
        //     url:mycloud.secure_url,
        // }
    })
    sentToken(user,201,res);
});

//
exports.Login_User = catchAsyncErrors(async(req,res,next)=>{
    const {email,password}= req.body;
    const user = await User.findOne({email}).select('+password')
    if(!user){
        return next(new Errrohandler('Invalid Email or Password',401))
    }
    console.log(user)
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new Errrohandler('Invalid Email or passowrd ',401))
    }
    sendToken(user,200,res);
})


exports.Logout_User = catchAsyncErrors(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logged out"
    })
})


exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.find({email:req.body.email})
    if(!user){
        return next(new Errrohandler('User Not found with this email'))
    }
    console.log(user);
    const resetToken = user.reset();
    await user.save({validateBeforesave:false})
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken} \n\n if you have not requested this , kindly ignore this`;
    const message = `Your Password reset token is as follow ${resetToken} \n \n if you have not requested this kindly ignore please`;
    try {
        await sendEmail({
            email:user.email,
            subject:"password recovery",
            message
        })
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPassWordExpire = undefined;
        await user.save({validateBeforesave:false})
        return next(new Errrohandler(error.message,500))
    }
})


exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPassWordExpire:{$gt:Date.now()}
    })
    if(!user){
        return (new Errrohandler('Password reset token is invalid or has been expired'),400);
    }
    if(req.body.password!=body.confirmPassword){
        return (new Errrohandler('Password does not match'),400);
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPassWordExpire = undefined;
    await user.save();
    sendToken(user,200,res);
})



exports.getUserProfile = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    if(!user){
        return (new Errrohandler('User Not found with this Id',400));
    }
    res.status(200).json({
        success:true,
        user
    })
})


exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password")
    const isMatched = await user.comparePassword(req.body.oldpassword);
    if(!isMatched){
        return (new Errrohandler('Old password is incorrect'))
    }
    await user.save();
    res.status(200).json({
        message:'done',
        user
    })
    sendToken(user,200,res);
})


exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
    const newuserdata = {
        name:req.body.name,
        email:req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user.id,newuserdata,{
        new:true,
        runValidators:true,
        useFindModify:false
    })
    sentToken(user,200,res);
})



exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new Errrohandler(`User does not found with id : ${req.params.id}`));
    }
    res.status(200).json({
        success:true,
        user
    })
})

exports.updateUser = catchAsyncErrors(async(req,res,next)=>{
    const newuserdata = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id,newuserdata,{
        new:true,
        runValidators:true,
        useFindModify:false
    })
    res.status(200).json({
        success:true
    })
})


exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new Errrohandler(`user does not found with id : ${req.params.id}`))
    }
    // const image_id = user.avatar_public_id;
    await user.remove();
    res.status(200).json({
        success:true
    })
})


exports.allusers = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success:true,
        users
    })
})