import React from 'react'

const Product = ({data}) => {
  return (
    <div>
        {data.category}
        {data.createAt}
        {data.description}
        {data.name}
        {data.numOfReviews}
        {data._id}
        {data.stock}
        product
        <br /><br /><br /><br /><br />
    </div>
  )
}

export default Product