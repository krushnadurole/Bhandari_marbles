import WebFont from 'webfontloader';
import Login from './components/User/Login';
import Register from './components/User/Register';
import { Routes, Route, useLocation } from 'react-router-dom';
import { loadUser } from './actions/userAction';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Account from './components/User/Account';
import Home from './components/Home/Home'
import Categories from './components/Layouts/Categories';
import Products from './components/Products/Products';
import ProductDetails from './components/ProductDetails/ProductDetails';
function App() {

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get('/api/v1/stripeapikey');
  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto:300,400,500,600,700"]
      },
    });
  });

  useEffect(() => {
    dispatch(loadUser());
    // getStripeApiKey();
  }, [dispatch]);

  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname])



  return (
    <>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/products' element={<Products/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='/productdetails/:id' element={<ProductDetails/>}/>




        {/* 
        
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Proudcts />} />
        <Route path='products/:keyword' element={<Products />} />


        <Route path='/cart' element={<Cart />} />


        <Route path='/order/confirm' element={
          <OrderConfirm />
        }>
        </Route>

        <Route path='/process/payment' element={
          <Payment />
        }>
        </Route>

        <Route path='/order/success' element={<OrderSuccess success={true} />} />
        <Route path='/order/failed' element={<OrderSuccess />} />
        <Route path='/order/:id' element={<OrderStatus />} />

        <Route path='/orders'>
          <MyOrders />
        </Route>


        <Route path='/order_details/:id'>
          <OrderDetails />
        </Route>


          <Route path='/account' element={<Account />} />
        <Route path='/account/update' element={
          <UpdateProfile />
        }>
        </Route>


        <Route path='/password/update' element={
          <UpdatePassword />
        }>
        </Route>

        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/password/rest/:token' element={<ResetPassword />} />


        <Route path='/wishlist' element={
          <Wishlist />
        }>


        </Route>
        <Route path='/admin/dashboard'>
          <DashBoard>
          </DashBoard>
        </Route>

        <Route path='/admin/orders' element={
          <DashBoard>
          </DashBoard>
        }>
        </Route>

        <Route path='/admin/order/:id' element={
          <UpdateOrder/>
        }>
        </Route>

        <Route path='/admin/products' element={<ProductTable/>}
        ></Route>

        <Route path='/admin/new_product' element={<Newproduct/>}></Route>
        <Route path='/admin/product/:id' element={<UpdateProduct/>}></Route>
        <Route path='/admin/users' element={<userTable/>}></Route>
        <Route path='/admin/user/:id' element={<UpdateUser/>}></Route>
        <Route path='/admin/reviews' element={<ReviewsTable/>}></Route>




 

        <Route path='*' element={<NotFound/>}></Route> 
        
        */}


      </Routes>
    </>
  );
}

export default App;
