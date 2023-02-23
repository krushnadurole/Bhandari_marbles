import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { clearErrors, getProductDetails, getSimilarProducts, newReview } from '../../actions/productAction';
import { NextBtn, PreviousBtn } from '../Home/Banner/Banner';
import ProductSlider from '../Home/ProductSlider/ProductSlider';
import Loader from '../Layouts/Loader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CachedIcon from '@mui/icons-material/Cached';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import { addItemsToCart } from '../../actions/cartAction';
import { getDeliveryDate, getDiscount } from '../../utils/functions';
import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();
    
    // reviews toggle. 
    const [open,setopen] = useState(false);
    const [viewall,setviewall] = useState(false);
    const [rating,setrating] = useState(0);
    const [comment,setcomment] = useState("");

    const {product,loading,error} = useSelector((state)=>state.productDetails);
    const {success,error:reviewError}  = useSelector((state) =>state.newReview)
    const {cartItems} = useSelector((state)=>state.cart);
    const {wishlistItems} = useSelector((state)=>state.wishlist);

    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };
    const productId = params.id;
    const itemsInWishlist = wishlistItems.some((i)=>i.product===productId)

    const addtoWishlistItemshandler = () =>{

    }
    const reviewSubmitHanlder = ()=>{
        if(rating===0 || !comment.trim()){
            enqueueSnackbar("Empty Review",{variant:"error"});
            return;
        }
        const formData = new FormData();
        formData.set('rating',rating)
        formData.set('comment',comment)
        formData.set('productId',productId);
        dispatch(newReview(formData));
        setopen(false); 
    }

    const addtocarthandler = ()=>{
        dispatch(addItemsToCart(productId));
        enqueueSnackbar('Product Added to cart',{variant:"success"})
    }
    const handleDialogclose = () =>{
        setopen(!open);
    }
    
    const itemincart = cartItems.some((i)=>i.product==productId)

    const gotocart = ()=>{
        navigate("/cart");
    }
    const buynow = ()=>{
        addtocarthandler();
        navigate('/shipping');
    }

    useEffect(() => {
        
    }, [])
    
  return (
   <>
   {loading ? <Loader/>:(
    <>
    <MetaData title = {product.name}/>
    <MinCategory/>
    <main>
        <div>
           <div>
            {product.name}
           </div>
           <div>
            {product.description}
           </div>
           <div>
            {product.price}
           </div>
           <div>
            <img src={product.images.url} alt={product.name} />
           </div>
            <div>
                {product.category}
            </div>
            <div>
                {product.stock}
            </div>
            <div>
                {product.warranty}
            </div>
            <div>
                {product.ratings}
            </div>
            <div>
                {product.numOfReviews}
            </div>
            <div>
                {product.createAt}
            </div>
        </div>
    </main>
    </>
   )}
   </> 
  );
}

export default ProductDetails