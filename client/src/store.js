import {  combineReducers, applyMiddleware } from 'redux';
import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import persistedReducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { forgotPasswordReducer, profileReducer, userReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducer';
// import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer, productReviewsReducer, reviewReducer } from './reducers/productReducer';
// import { cartReducer } from './reducers/cartReducer';
// import { saveForLaterReducer } from './reducers/saveForLaterReducer';
// import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer, paymentStatusReducer } from './reducers/orderReducer';
// import { wishlistReducer } from './reducers/wishlistReducer';

// const reducer = combineReducers({
//     user: userReducer,
//     profile: profileReducer,
//     forgotPassword: forgotPasswordReducer,
//     products: productsReducer,
//     productDetails: productDetailsReducer,
//     newReview: newReviewReducer,
//     cart: cartReducer,
//     saveForLater: saveForLaterReducer,
//     newOrder: newOrderReducer,
//     myOrders: myOrdersReducer,
//     paymentStatus: paymentStatusReducer,
//     orderDetails: orderDetailsReducer,
//     allOrders: allOrdersReducer,
//     order: orderReducer,
//     newProduct: newProductReducer,
//     product: productReducer,
//     users: allUsersReducer,
//     userDetails: userDetailsReducer,
//     reviews: productReviewsReducer,
//     review: reviewReducer,
//     wishlist: wishlistReducer,
// });

// // const storageUserInfo = localStorage.getItem('userInfo')
// //   ? JSON.parse(localStorage.getItem('userInfo'))
// //   : null;

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
    saveForLater: {
        saveForLaterItems: localStorage.getItem('saveForLaterItems')
            ? JSON.parse(localStorage.getItem('saveForLaterItems'))
            : [],
    },
    wishlist: {
        wishlistItems: localStorage.getItem('wishlistItems')
            ? JSON.parse(localStorage.getItem('wishlistItems'))
            : [],
    },
    // userLogin: { userInfo: storageUserInfo }
};

const middleware = [thunk];


// export default store;




const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
// const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
