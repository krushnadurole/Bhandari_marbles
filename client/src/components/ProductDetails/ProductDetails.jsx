import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { clearErrors, getProductDetails, getSimilarProducts, newReview } from '../../actions/productAction';
import { NextBtn, PreviousBtn } from '../Home/Banner/Banner';
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
import MetaData from '../Layouts/MetaData';

const ProductDetails = () => {
  // product id extracted from the parameters. 
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enqueueSnackbar = useSnackbar();

  // different states 
  const [open, setopen] = useState(false);
  const [rating, setrating] = useState(false);

  const { loading, product, error } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector((state) => state.newReview)
  const { cartItems } = useSelector((state) => state.cartItems)
  const { wishlistItems } = useSelector((state) => state.wishlist);

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

  console.log(id);
  const iteminwishlist = wishlistItems.some((i) => i.product == id);

  const addtowihlisthandler = () => {
    if (iteminwishlist) {
      dispatch(removeFromWishlist);
      enqueueSnackbar("Remove From Wishlist", { variant: "success" })
    } else {
      dispatch(addToWishlist);
      enqueueSnackbar("Added to wishlist", { variant: "success" });
    }
  }


  const reviewsubmithandler = () => {
    if (rating == 0 || !Comment.trim()) {
      enqueueSnackbar("Empty Review", { variant: "error" })
      return;
    }
    const formdata = new formdata();
    formdata.set("rating", rating)
    formdata.set("comment", Comment)
    formdata.set("ProductId", id);
    dispatch(newReview(formdata))
    setopen(false);
  }


  const addtocarthandler = () => {
    dispatch(addItemsToCart(id));
    enqueueSnackbar("Product Added to Cart", { variant: "Success" })
  }

  const handleDialogclose = () => {
    setopen(!open);
  }

  const itemincart = cartItems.some((i) => i.product === id);
  const gototcart = () => {
    navigate('/cart');
  }
  const buynow = () => {
    addtocarthandler();
    navigate('/shipping');
  }

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (reviewError) {
      enqueueSnackbar(reviewError, { variant: "error" });
      dispatch(clearErrors());
    }
    if (success) {
      enqueueSnackbar("Review Submitted Successfully", { variant: "success" });
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
    // enqueueSnackbar("")
    console.log("Hello", product);
  }, [])

  useEffect(() => {
    dispatch(getSimilarProducts(product?.category));
  }, [dispatch, product, product.category]);

  return (
    <div>
      ProductDetails
      <div>
        <div class="card">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">{product.name}</h6><br />
            <h5 class="card-title">{product.category}</h5><br />
            <p class="card-text">About: <br />{product.description.substr(0, 250)}</p><br />
            <p class="card-text">Reviews:{product.numOfReviews}</p><br />
            <p class="card-text">Stock:{product.stock}</p><br />
            <a href="#" class="card-link">Created At:{product.createdAt}</a> <br /> <br />
            <a href="#" class="card-link">Id of Product: &nbsp;{product._id}</a><br />
            {/* <ProductDetails id = {product._id}/> */} <br />
            <Link to={`/productdetails/${product._id}`}>ProductDetails</Link>
          </div>
        </div>
        <br /><br /><br /><br /><br />
      </div>
    </div>
  )
}

export default ProductDetails