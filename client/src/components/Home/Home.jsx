import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css'
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
const Home = () => {
  return (
    <div className='home'>
      <nav>
        <div>
          <div className='navtop text-lg'>
            Bhandari Marbles
          </div>
          <div className='nav mgt'>
          <Link to="/login" className='btn btn-primary' >Login</Link>
          <Link to="/register" type="Link" className="btn btn-primary">SignUp</Link>
          <Link to="/account" type="Link" className="btn btn-primary">Account</Link>
          <Link className='logout'><LogoutRoundedIcon /></Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Home