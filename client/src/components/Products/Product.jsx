import React from 'react'
import ProductDetails from '../ProductDetails/ProductDetails'
import { Link } from 'react-router-dom'
const Product = ({ data }) => {
    return (
        <div>
            <div class="card">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">{data.name}</h6>
                    <h5 class="card-title">{data.category}</h5>
                    <p class="card-text">About: <br />{data.description.substr(0, 250)}</p>
                    <p class="card-text">Reviews:{data.numOfReviews}</p>
                    <p class="card-text">Stock:{data.stock}</p>
                    <a href="#" class="card-link">Created At:{data.createdAt}</a>
                    <a href="#" class="card-link">Id of Product: &nbsp;{data._id}</a>
                    {/* <ProductDetails id = {data._id}/> */} <br />
                    <Link to={`/productdetails/${data._id}`}>ProductDetails</Link>
                </div>
            </div>
            <br /><br /><br /><br /><br />
        </div>
    )
}

export default Product