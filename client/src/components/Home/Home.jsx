import React,{useEffect} from 'react'
import { Link } from 'react-router-dom';
import './Home.css'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MetaData from '../Layouts/MetaData';
import Banner from './Banner/Banner';
import DealSlider from './DealSlider/DealSlider';
import Prouductslider from './ProductSlider/Prouductslider';
import {useDispatch,useSelector} from 'react-redux';
import { useSnackbar } from 'notistack';
import { clearErrors, getSliderProducts } from '../../actions/productAction';

const Home = () => {
  const dispatch = useDispatch();
  const {enqueuesnackbar} = useSnackbar();
  const {error,loading} = useSelector((state)=>state.products);

  useEffect(() => {
   if(error){
      enqueuesnackbar(error,{variant:"error"});
      dispatch(clearErrors);
   }
   dispatch(getSliderProducts());

  }, [dispatch,error,enqueuesnackbar]);
  
  return (
    
    <div className='home'>
      <MetaData title="Bhandari Marbles"></MetaData>

      <nav>
        <div>
          <div className='navtop text-lg'>
            <p className='title'>Bhandari Marbles</p>
          </div>
          <div className='nav mgt'>
            <Link to="/login" className='btn btn-primary' >Login</Link>
            <Link to="/register" type="Link" className="btn btn-primary">SignUp</Link>
            <Link to="/account" type="Link" className="btn btn-primary">Account</Link>
            <Link to='/categories' type="Link" className="btn btn-primary">Categories</Link>
            <Link className='logout'><LogoutRoundedIcon /></Link>
          </div>

          <div>
            <DealSlider title={"Disconts for You !!!"}/>
            {!loading && <Prouductslider title={"Suggested for You"}/>}
            <DealSlider title={"Top Brands , Best Price"}/>
            {!loading && <Prouductslider title={"You May also like..."} tagline={"Based on your interest"}/>}
            <DealSlider title={"Top Offers on"}/>
            {!loading && <Prouductslider title={"Don't Miss These ! "} tagline={"Based on your interest"}/>}
          </div>

        </div>
      </nav>
    </div>
  )
}

export default Home