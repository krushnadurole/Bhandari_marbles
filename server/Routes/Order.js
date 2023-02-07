const express = require("express");
const router = express.Router();


const { createNewOrder, myOrders,updateOrder,getsingleOrder, allOrders, deleteorder }  = require("../Controllers/OrderController");

const {isAuthenticateUser,AuthorizeRoles} = require("../Middlewares/auth");

router.route('/order/new').post(isAuthenticateUser,createNewOrder);
router.route('/order/:id').get(isAuthenticateUser,getsingleOrder);
router.route('/order').get(isAuthenticateUser,myOrders);
router.route('/admin/orders').get(isAuthenticateUser,AuthorizeRoles('admin'),allOrders);
router.route('/admin/order/:id').put(isAuthenticateUser,AuthorizeRoles('admin'),updateOrder)
                                .delete(isAuthenticateUser,AuthorizeRoles('admin'),deleteorder);


module.exports = router;