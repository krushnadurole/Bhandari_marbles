import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getRandomProducts } from '../../../utils/functions'
import { settings } from '../DealSlider/DealSlider'
import Product from './Product'
import Slider from 'react-slick'

const ProuductSlider = ({title,tagline}) => {
  const {loading,products} = useSelector((state)=>state.products)
  useEffect(() => {
    console.log(products);
  }, [])
  
  return (
    <>
    <section>
      <div>
        <div>
          <h1>{title}</h1>
          <p>{tagline}</p>
        </div>
        <Link to="/products">View ALL</Link>
      </div>
      <hr />
      {loading?null:
      <Slider {...settings}>
        {products && getRandomProducts(products,12).map((item)=>(
          <Product {...item} key={item._id}/>
        ))}
      </Slider>
      }
    </section>
    </>
    )
}

export default ProuductSlider