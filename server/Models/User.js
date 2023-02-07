const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// const { reset } = require('nodemon');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter your Name'],
        maxlength: [30, 'Your Name cannot Exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail],
    },
    password: {
        type: String,
        required: [true, 'Please Enter Your password'],
        minlength: [6, 'Your Password must be longer than 6 characters'],
        select: false
    }, 
    avatar: {
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    },
    role: {
        type: String,
        default: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPassWordExpire: Date
})


userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})



// compare user password. 
userSchema.methods.comparePassword = async function (enterpassword){
    return await bcrypt.compare(enterpassword,this.password);
}

// Get the json WebToken
userSchema.methods.getJwtToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    });
}


userSchema.methods.reset =  ()=> {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    // this.resetPasswordToken


    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000
    // this.resetPasswordExpire
    return resetToken

}
module.exports = mongoose.model('User', userSchema);
