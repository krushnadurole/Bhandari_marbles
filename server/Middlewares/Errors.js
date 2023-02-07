const Errorhandler = require('../Utils/Errorhandler')

module.exports = (err,req,res,next)=>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal server Error"
    if(process.env.NODE_ENV ==="DEVELOPEMENT"){
        res.status(err.statuscode).json({
            success:false,
            error:err,
            errormessag :err.message,
            stack:err.stack
        })
    }
    if(process.env.NODE_ENV==='PRODUCTION'){
        let error = {...err}
        error.message = err.message
        if(err.name==='CastError'){
            const message = `Resource Not found. Invalid : ${err.path}`;
            error = new Errorhandler(message,400);
        }
        // handling mongoose duplicate key error
        if(err.code===11000){
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            error = new Errorhandler(message,400)
        }

        if(err.name=='JsonWebTokenError'){
            const message = 'JSON WEB token is invalid. TRY Again !!!'
            error = new Errorhandler(message,400);
        }
        res.status(err.statuscode).json({
            success:false,
            message:error.message||"Internal Server Error"
        })
    }
}


