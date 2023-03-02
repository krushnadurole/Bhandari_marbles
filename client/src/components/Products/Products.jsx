import React, { useState,useEffect } from 'react'
import { clearErrors, getProducts } from '../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useLocation, useParams,Link } from 'react-router-dom';
import Product from './Product';

const Products = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const params = useParams();
    const location = useLocation();

    const [price,setprice] = useState([0,200000]);
    const [ratings,setratings] = useState(0);

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
    const keyword = params.keyword;


    useEffect(() => {
      if(error){
        enqueueSnackbar(error,{variant:"error"})
        dispatch(clearErrors());
      }
      dispatch(getProducts());
      console.log(products);
    }, [dispatch,keyword,price,ratings,error,enqueueSnackbar]);
    
  return (
    <div>
      <Link to='/'>DashBoard</Link>
     {products&&products.map((item)=>(
      <Product data={item}/>
      ))}
    </div>
  )
}

export default Products