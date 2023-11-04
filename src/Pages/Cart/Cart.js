import './Cart.css';

import PaymentDetails from '../Payment/PaymentDetails';

import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { addtowishlist } from '../../Redux/Slices/wishlistSlice';
import { changeQuantity, getPaymentInfo, removefromCart } from '../../Redux/Slices/cartSlice';

const Cart = () => {

    const [qty, setQty] = useState(1);
    const [itemName, setItemName] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartitems } = useSelector((state) => state.cart);
    const WishlistItems = useSelector((state) => state.wishlist);

    const wishlistHandler = (wishlistItems) => {
        dispatch(addtowishlist(wishlistItems));
        dispatch(removefromCart(wishlistItems.name));
    }

    const cartHandler = (itemName) => {
        dispatch(removefromCart(itemName));
    }

    const qtyNameHandler = (name) => (event) => {
        setItemName(name);
        setQty(event.target.value);
    }

    useEffect(() => {
        dispatch(changeQuantity([qty, itemName]));
    }, [qty])


    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user-info')))
            localStorage.setItem("cartItems", JSON.stringify(cartitems));
        else
            localStorage.setItem("noUserCartItems", JSON.stringify(cartitems));
    }, [cartitems]);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user-info')))
            localStorage.setItem("wishList", JSON.stringify(WishlistItems));
        else
            localStorage.setItem("noUserWishlist", JSON.stringify(WishlistItems));
    }, [WishlistItems]);


    return (
        <div className="cart-container">
            {
                cartitems.length > 0 ?
                    <>
                        <h2>Order Summary</h2>
                        <div className="cart-wrapper">
                            <div className="products">
                                <h5 className='products-text'>PRODUCTS</h5>
                                {
                                    cartitems.map((item, index) => {

                                        let discount = parseInt((100 - (item.sellingPrice / item.listPrice) * 100));

                                        return (
                                            <div className="product-container" key={index}>
                                                <div className="product-wrapper">
                                                    <div className="cart-img">
                                                        <img src={item.url} alt="cart-img"></img>
                                                    </div>
                                                    <div className='cart-content'>
                                                        <div className="product-name" onClick={() => { navigate("/dynamicpage", { state: item }) }}>{item.name}</div>
                                                        <div className="product-seller">Seller: {item.seller}</div>
                                                        <div className='prices-wrapper'>
                                                            <div className='prices'>
                                                                {
                                                                    item.qty === 1 ?
                                                                        <>
                                                                            <span className="product-list-price"><s>&#8377;{item.listPrice}</s></span>
                                                                            <span className="product-selling-price">&#8377;{item.sellingPrice}</span>
                                                                        </> :
                                                                        <>
                                                                            <span className="product-list-price"><s>&#8377;{item.cartListPrice}</s></span>
                                                                            <span className="product-selling-price">&#8377;{item.cartSellingPrice}</span>
                                                                        </>
                                                                }
                                                                <span className="product-off">{discount}% off</span>
                                                            </div>
                                                            <div className='qty-selector'>
                                                                <span >QTY:</span>
                                                                <select onChange={qtyNameHandler(item.name)} >
                                                                    <option value={1}>1</option>
                                                                    <option value={2}>2</option>
                                                                    <option value={3}>3</option>
                                                                    <option value={4}>4</option>
                                                                    <option value={5}>5</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className='buttons'>
                                                            <div className='accentcolor-button' onClick={() => { cartHandler(item.name) }} >REMOVE</div>
                                                            <div className='accentcolor-button' onClick={() => { wishlistHandler(item) }}>ADD TO WISHLIST</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>
                                        );
                                    })
                                }
                                <h5 className='add-items' onClick={() => navigate("/")} >ADD MORE ITEMS </h5>
                            </div>
                            <PaymentDetails />
                        </div>
                    </> :
                    <div className='wishlist-empty'>
                        <div className='wishlist-content'>
                            <img src="https://i0.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?fit=603%2C288&ssl=1" alt='cart-empty'></img>
                            <h3>Empty Cart</h3>
                            <p>You have no items in your Cart</p>
                            <Link to='/'>
                                <div className='placeorder-button width-margin'>ADD TO CART</div>
                            </Link>
                        </div>
                    </div>
            }
        </div>
    );
}

export default Cart;