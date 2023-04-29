import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addtoCart } from '../../Redux/Slices/cartSlice';
import { moveToCart, removeFromWishlist } from '../../Redux/Slices/wishlistSlice';
import './Wishlist.css';

const Wishlist = () => {

    const dispatch = useDispatch();

    const WishlistItems = useSelector((state)=> state.wishlist);
    const { cartitems } = useSelector((state) => state.cart);

    const wishlistHandler = (wishlistItem) => {
        dispatch( moveToCart(wishlistItem.id) );
        dispatch( addtoCart(wishlistItem) );
    }

    const removeWishlistItem = (itemName) => {
        dispatch( removeFromWishlist(itemName));
    }
    
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user-info')))
          localStorage.setItem("cartItems", JSON.stringify(cartitems));
      }, [cartitems]);
    
      useEffect(() => {
        if (JSON.parse(localStorage.getItem('user-info')))
          localStorage.setItem("wishList", JSON.stringify(WishlistItems));
      }, [WishlistItems]);
    
      useEffect(() => {
        if (!JSON.parse(localStorage.getItem('user-info')))
          localStorage.setItem("noUserCartItems", JSON.stringify(cartitems));
      }, [cartitems]);
    
      useEffect(() => {
        if (!JSON.parse(localStorage.getItem('user-info')))
          localStorage.setItem("noUserWishlist", JSON.stringify(WishlistItems));
      }, [WishlistItems]);

    return (
        <div className="wishlist-container">
            {
                WishlistItems.length > 0 ?
                    <>
                        <h2>My Wishlist<span>({WishlistItems.length})</span></h2>
                        <hr></hr>
                        {
                            WishlistItems.map((item,index) => {
                                return (
                                    <div className="wishlist-item-container" key={index}>
                                        <div className="wishlist-item-wrapper">
                                            <div className="cart-img">
                                                <img src={item.url} alt="cart-img"></img>
                                            </div>
                                            <div className='wishlist-item-content cart-content'>
                                                <div className="product-name">{item.name}</div>
                                                <div className="product-seller">Seller:{item.seller}</div>
                                                <div className='prices-wrapper'>
                                                    <div className='prices'>
                                                        <span className="product-list-price"><s>&#8377;{item.listPrice}</s></span>
                                                        <span className="product-selling-price">&#8377;{item.sellingPrice}</span>
                                                        <span className="product-off">10% off</span>
                                                    </div>
                                                </div>
                                                <div className='wishlist-buttons'>
                                                    <div className='accentcolor-button' onClick={ ()=> { removeWishlistItem(item.name) }}>REMOVE</div>
                                                    <div className='accentcolor-button' onClick={ ()=> { wishlistHandler(item) }}>MOVE TO CART</div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                );
                            })
                        }
                    </> :
                    <div className='wishlist-empty'>
                        <div className='wishlist-content'>
                            <img src="https://i0.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?fit=603%2C288&ssl=1" alt='cart-empty'></img>
                            <h3>Empty Wishlist</h3>
                            <p>You have no items in your wishlist. Start adding!</p>
                            <Link to="/">
                                <div className='placeorder-button width-margin'>ADD TO WISHLIST</div>
                            </Link>
                        </div>
                    </div>
            }
        </div>

    );
}

export default Wishlist;