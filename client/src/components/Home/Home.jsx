import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MetaData from '../Layouts/MetaData';
import Banner from './Banner/Banner';
import DealSlider from './DealSlider/DealSlider';
import Prouductslider from './ProductSlider/Prouductslider';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { clearErrors, getSliderProducts } from '../../actions/productAction';
import {logoutUser} from '../../actions/userAction'
import { Button } from '@mui/material';

const Home = () => {
  const dispatch = useDispatch();
  const { enqueuesnackbar } = useSnackbar();
  const {isAuthenticated, error, loading } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [done,setdone] = useState(false);
  const logoutuser = ()=>{
    localStorage.removeItem('userInfo');
    // isAuthenticated = false;
    setdone(!done);
    console.log("function");
    dispatch(logoutUser())
  }
  useEffect(() => {
    if (error) {
      enqueuesnackbar(error, { variant: "error" });
      dispatch(clearErrors);
    }
    console.log(localStorage.getItem('userInfo'));
    // if(!isAuthenticated){
    //   navigate("/login")
    // }
    // dispatch(getSliderProducts());
    // localStorage.getItem('userInfo')
  }, [done,error, enqueuesnackbar]);
  
  return (

    <div className='home'>
      <MetaData title="Bhandari Marbles"></MetaData>

      <nav>
        <div>
          <div className='navtop text-lg'>
            <p className='title'>Bhandari Marbles</p>
          </div>
          <div className='nav mgt'>
            {
              !localStorage.getItem('userInfo')&&
              <div> <Link to="/login" className='btn btn-primary' >Login</Link>
                <Link to="/register" type="Link" className="btn btn-primary">SignUp</Link>
                </div>
            }
            {
              localStorage.getItem('userInfo')&&
              <div>
                <Link to="/account" type="Link" className="btn btn-primary">Account</Link>
                <Link to='/categories' type="Link" className="btn btn-primary">Categories</Link>
                <Link to='/products' type="Link" className="btn btn-primary">products</Link>
                <button className='logout' onClick={logoutuser}><LogoutRoundedIcon /></button>
                {/* <Link className='logout' ><LogoutRoundedIcon /></Link> */}
              </div>
            }
          </div>

          {/* <div>
            <DealSlider title={"Disconts for You !!!"}/>
            {!loading && <Prouductslider title={"Suggested for You"}/>}
            <DealSlider title={"Top Brands , Best Price"}/>
            {!loading && <Prouductslider title={"You May also like..."} tagline={"Based on your interest"}/>}
            <DealSlider title={"Top Offers on"}/>
            {!loading && <Prouductslider title={"Don't Miss These ! "} tagline={"Based on your interest"}/>}
          </div> */}

        </div>
      </nav>
    </div>
  )
}

export default Home