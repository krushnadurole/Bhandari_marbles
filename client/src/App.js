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
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import UpdateProfile from './components/User/UpdateProfile';

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
        <Route path='/productdetails/:id' element={<ProductDetails/>}/>

        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={< ResetPassword/>} />
        <Route path="/password/reset/:token" element={< ResetPassword/>} />
        <Route path="/account/update" element={< UpdateProfile/>} />
      </Routes>
    </>
  );
}

export default App;
