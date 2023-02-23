import { getDiscount } from '../../../utils/functions';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../actions/wishlistAction';
import { useSnackbar } from 'notistack';

const Product = (props) => {
  const { _id, name, images, ratings, numOfReviews, price, cuttedPrice } = props;
  const dispatch = useDispatch();
  const { enqueuesnackbar } = useSnackbar();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const itemInWishlist = wishlistItems.some((i) => i.Product === _id);
  const addtowishlisthandler = () => {
    if (itemInWishlist) {
      dispatch(removeFromWishlist);
      enqueuesnackbar("Removed from Wishlist", { variant: "success" });
    } else {
      dispatch(addToWishlist(_id));
      enqueuesnackbar("Added to Wishlist", { variant: "success" });
    }
  }
  return (
    <>
      <div>
        {/* image & product title */}
        <Link to={`/product/${_id}`}>
          <div>
            <img src={images[0].url} alt={name} />
          </div>
          <h2>{name.length > 50 ? `${name.substring(0, 50)}...` : name}</h2>
        </Link>
        {/* image & product title  */}

        {/* product description  */}
        <div>
          {/* ratings badge  */}
          <span>
            {/* <span>{ratings.toFixed(1)}</span>
            <span>{numOfReviews.toLocaleString()}</span> */}
          </span>
          {/* rating badge  */}

          {/* price container  */}
          {/* <div>
            <span>₹{price.toLocaleString()}</span>
            <span >₹{cuttedPrice.toLocaleString()}</span>
            <span >{getDiscount(price, cuttedPrice)}%&nbsp;off</span>
          </div> */}
          {/* price container  */}
        </div>
        {/* product description */}

        {/* wishlist badge  */}
        <span onClick={addtowishlisthandler}>Wishlist</span>
        {/* wishlist badge  */}
      </div>
    </>
  )
}

export default Product