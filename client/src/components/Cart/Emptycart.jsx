import React from 'react'

const Emptycart = () => {
  return (
    <div>
        <div>
            <img draggable="false" src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png" alt="Empty Cart" />
        </div>
        <span>Your cart is Empty ! </span>
        <p>Add items to it now.</p>
        <Link to='/products'>Show Now</Link>
    </div>
  )
}

export default Emptycart