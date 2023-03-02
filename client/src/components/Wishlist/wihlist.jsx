import { useSelector } from 'react-redux';
import MetaData from '../Layouts/MetaData';
import Product from './Product';

const wishlist = () => {
    const { wishlistItems } = useSelector((state) => state.wishlist);
    return (
        <>
            <MetaData title="Wihlist | FlipKart" />
            <main>
                <div>
                    <div>
                        <div>
                            <span>My wihlist ({wishlistItems.length})</span>
                            {wishlistItems.length === 0 && (
                                <div>
                                    <img src="" alt="" />
                                    <span>Empty wihlistItems</span>
                                    <p>You have no items in your wihlist. Start adding !</p>
                                </div>
                            )}
                            {
                                wishlistItems.map((item, index) => (
                                    <Product {...item} key={index} />
                                )).reverse()
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}