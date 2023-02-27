import React from 'react'
import notFound from '../assets/images/404-not-found.svg';
import {Link} from 'react-router-dom'
const NotFound = () => {
    
  return (
    <>
    <div>
        <img draggable="false" src={notFound} alt="Page ot Found" />
        <Link to="/">Back To Home</Link>
    </div>
    </>
  )
}

export default NotFound