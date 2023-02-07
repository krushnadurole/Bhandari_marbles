const express  = require('express')
const router = express.Router();

const {
    Register_User,
    Login_User,
    Logout_User,
    forgotPassword,
    resetPassword,
    updatePassword,
    updateProfile,
    getUserProfile,
    getUserDetails,
    updateUser,
    deleteUser,
    allusers
} = require('../Controllers/AuthController');

const {isAuthenticateUser,AuthorizeRoles} = require('../Middlewares/auth');
router.route('/register').post(Register_User);
router.route('/Login').post(Login_User);
router.route('/logout').get(Logout_User);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/update').put(isAuthenticateUser,updatePassword);
router.route('/me/update').put(isAuthenticateUser,updateProfile);
router.route('/me').get(isAuthenticateUser,getUserProfile);
router.route('/admin/users').get(isAuthenticateUser,AuthorizeRoles('admin'),allusers)
router.route('/admin/user/:id')
    .get(isAuthenticateUser,AuthorizeRoles('admin'),getUserDetails)
    .put(isAuthenticateUser,AuthorizeRoles('admin'),updateUser)
    .delete(isAuthenticateUser,AuthorizeRoles('admin'),deleteUser)


module.exports = router;