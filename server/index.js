const dontenv = require('dotenv')
const express = require('express')
const cloudinary = require('cloudinary');
const app = require('./app')
const connecToDatabase = require('./Config/database')

// // setting config file. 
dontenv.config({path:"../server/Config/config.env"})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

process.on('uncaughtException',err=>{
    console.log(`Error : ${err.message}`)
    console.log(`Shutting down the server due to uncaught exceptions`)
    process.exit(1);
})

connecToDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on Port : ${process.env.PORT} in ${process.env.NODE_ENV} MODE`)
})


process.on('unhandledRejection',err=>{
    console.log(`Error : ${err.message}`)
    console.log('Shutting down the server due to unhandle promise rejection')
    server.close(()=>{
        process.exit(1);
    })
})