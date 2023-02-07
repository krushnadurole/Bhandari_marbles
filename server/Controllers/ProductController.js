const Product = require('../Models/Product')
const Errorhanlder = require('../Utils/Errorhandler')
const catchAsyncErrors = require('../Middlewares/CatchAsyncError')
const ApiFeatures = require('../Utils/ApiFeatures')


exports.newProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})



exports.getProducts = catchAsyncErrors(async(req,res,next)=>{
    const resPerPage = 4;
    const Productcount = await Product.countDocuments();
    const apifeatures = new ApiFeatures(Product.find(),req.query)
        .search()
        .pagination(resPerPage)
        .filter()

    let products = await apifeatures.query;
    let filterproducts = products.length;
    // if(!product){
    //     return (new Errorhanlder())
    // }
    if(!products){
        res.status(404).json({
            success:false,
            message:"Rleated Products Not Found"
        })
    }
    res.status(200).json({
        status:true,
        Productcount,
        resPerPage,
        filterproducts,
        products
    });

})




exports.getsingleproduct = catchAsyncErrors(async(req,res,next)=>{
    const singleproduct = await Product.find(req.params.id);
    if(!singleproduct){
        return next(new Errorhanlder('Product Not Found',404));
    }
    res.status(200).json({status:true,singleproduct});
})

exports.updateproduct = catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product Not Found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        product
    })
})




exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const Product = await Product.findByIdAndDelete(req.params.id);
    if(!Product){
        return res.status(404).json({
            success:false,
            message:"Product Not Found"
        })
    }
    await Product.deleteOne();
    res.status(200).json({
        success:true,
        message:"Product is Deleted"
    })
})


exports.deleteReview = catchAsyncErrors(async(req,res,next)=>{
    const Product = await Product.findById(req.params.id);
    // get all the reviews except one with required id
    const reviews = Product.reviews().filter(review=>review._id.toString()!=req.query.id.toString());
    const numOfReviews = reviews.length();
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        rating,
        numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true
    })
})
