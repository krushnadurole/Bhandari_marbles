import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MetaData from '../Layouts/MetaData';
const Home = () => {
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
            <Link to='/categories'type="Link" className="btn btn-primary">Categories</Link>
            <Link className='logout'><LogoutRoundedIcon /></Link>
          </div>
          <div>

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Home