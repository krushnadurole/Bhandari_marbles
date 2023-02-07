const Order = require('../Models/Order')
const Product = require('../Models/Product')

const Errorhandler = require('../Utils/Errorhandler');
const catchAsyncErrors = require('../Middlewares/CatchAsyncError');
const CatchAsyncError = require('../Middlewares/CatchAsyncError');

exports.createNewOrder = catchAsyncErrors(async(req,res,next)=>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt : Date.now(),
        user:req.user._id
    })
    res.status(200).json({
        success:true,
        order
    })
})



exports.getsingleOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate('user','name email');
    if(!order){
        return next(new Errorhandler('No order exists with this Id',404))
    }
    res.status(200).json({
        success:true,
        order
    })
})

exports.myOrders = catchAsyncErrors(async(req,res,next)=>{
    const Orders = await Order.findById(req.user.id);
    let totalAmount = 0;
    Orders.forEach(element => {
        totalAmount+=element.totalPrice;
    });
    console.log(Orders);
    res.status(200).json({
        success:true,
        Orders
    })
})



exports.allOrders = CatchAsyncError(async(req,res,next)=>{
    const orders = await Order.find();
    let totalAmount=0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice;
    })
    res.status(200).json({
        success:true,
        orders,
        totalAmount
    })
})

exports.updateOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.find(req.params.id);
    if(order.orderStatus=='Delivered'){
        return next(new Errorhandler('You have already delivered this order ',400))
    }
    order.orderItems.forEach(async item=>{
        await updatestock(item.product,item.quantity);
    })
    order.orderStatus = req.body.status;
    order.deliverAt = Date.now();
    await order.save();
    res.status(200).json({
        success:true
    })
})

async function updatestock(id,quantity){
    const product = await Product.findById(id);
    product.stock -=quantity;
    await product.save({validateBeforeSave:false});
}



// delete order 
exports.deleteorder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new Errorhandler('No Order found with this Id',404));
    }
    await order.remove();
    res.status(200).json({
        success:true
    })
})