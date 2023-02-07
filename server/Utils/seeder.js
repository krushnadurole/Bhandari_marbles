const Proudct = require('../Models/Product')
const dotenv = require('dotenv')
const connectToMongo = require('../Config/database');
const products = require('../data/products.json');
const Product = require('../Models/Product');



// setting dotenv file. 
dotenv.config({path:'server/Config/config.env'});

connectToMongo();


const seedProduct = async(req,res,next)=>{
    try {   
        await Product.deleteMany();
        console.log("Products are deleted");
        await Product.insertMany(products);
        console.log("All products are inserted")
        process.exit();
    } catch (error) {
        console.log({error:error.message});
        process.exit();
    }
}

seedProduct();