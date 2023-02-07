const express = require('express')
const router = express.Router();

const { getProducts, newProduct, getsingleproduct, updateproduct, deleteProduct } = require('../Controllers/ProductController');
const { isAuthenticateUser, AuthorizeRoles } = require('../Middlewares/auth');

//localhost:3001/api/v1/Products
router.route('/Products').get(getProducts);
// router.route('/admin/Products').get(isAuthenticateUser,getProducts);
// AuthorizeRoles('admin'),
//localhost:3001/api/v1/product/id
router.route('/product/:id').get(getsingleproduct)

//localhost:3001/api/v1/createProduct
router.route('/admin/product/new').post(isAuthenticateUser,AuthorizeRoles('admin'),newProduct);
// AuthorizeRoles('admin'),

// localshot:3001/api/v1/product/id
router.route('/admin/product/:id')
    .put(isAuthenticateUser,updateproduct)


    // .put(deleteProduct)
// localhost:3001/api/v1/product/:id
router.route('/admin/product/:id').delete(isAuthenticateUser,deleteProduct);



module.exports = router;






















// localshot:3001/api/v1/product/id
// router.route('/admin/product/:id').put(updateproduct);
// const express = require('express');
// // const { route } = require("../app");
// const router = express.Router();

// router.get('/Products',(req,res)=>{
//     res.json({msg:"Hello"})
// })
// module.exports = router;