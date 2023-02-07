const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductSchema = new Schema({
    name:{
        type:String,
        // required:[true,'please Enter the Product Name' ],
        trim:true,
        maxLength:[100,'Product name cannot exceet 100 characters']
    },
    price:{
        type:Number,
        // required:[true,'please enter the product price'],
        maxLength:[5,'Product name cannot exceed 5 characters'],
        default:0.0
    },
    description:{
        type:String,
        // required:[true,'please enter the product description']
    },
    ratings:{
        type:Number,
        default:0.0
    },
    images:[
        {
            public_id:{
                type:String,
                // required:true
            },
            url:{
                type:String,
                // required:true
            }
        }
    ],
    category:{
        type:String,
        // required:[true,'please type of marble from following'],
        enum:{
            values:[
               'Electronics',
               'Cameras',
               'Laptops',
               'Accessories',
               'Headphones',
               'Food',
               'Books',
               'Clothes/shoes',
               'Beauty/Health',
               'Sports',
               'Outdoor',
               'Home' 
            ],
            message:'Please select category for product'
        }
    },
    stock:{
        type:Number,
        // required:[true,'Please enter product stock'],
        maxLength:[5,'Product name cannot exceed 5 characters'],
        default:0.0
    },
    numofReviews:{
        type:Number,
        default:0.0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'User',
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        // required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Product',ProductSchema)