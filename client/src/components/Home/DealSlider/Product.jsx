import React from 'react'

const Product = ({image,name,tag,offer}) => {
  return (
    <>
      <Link to="/products">
        <div>
          <img src={image} alt={name} />
        </div>
        <h2>{name}</h2>
        <span>{offer}</span>
        <span>{tag}</span>
      </Link>
    </>
  )
}

export default Product