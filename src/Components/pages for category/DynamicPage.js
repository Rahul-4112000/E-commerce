import { useLocation, useNavigate } from 'react-router-dom';
import './DynamicPage.css';

import { addtoCart } from '../../Redux/Slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { useState } from 'react';

const DynamicPage = () => {

    let displayoff = false ;

    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart.cartitems);

    const { state: Product } = location;

    const cartAddHandler = (product) => {
        dispatch(addtoCart(product));
    }

    cart.map((cartItem) => {
        if (cartItem.name === Product.name){
            console.log("true")
            displayoff = true;
        }
        else {
            displayoff = false;
        }
        return(
            null
        )
    });

    let listprice = Product.listPrice;
    let sellingprice = Product.sellingPrice;
    let discount = parseInt((100 - (sellingprice / listprice) * 100));

    return (
        <div className="mobile-container">
            <div className="mobile-wrapper">
                <div className="mobile-img-wrapper">
                    <img src={Product.url} alt="mobile"></img>
                </div>
                <div className="mobile-content-wrapper">
                    <div className='brand-name'>{Product.brand}</div>
                    <div className="mobile-name f-bold-large">{Product.name}</div>
                    <div className="mobile-selling-price ">Best Price* <span className='f-bold-large'>&#8377;{Product.sellingPrice}</span> </div>
                    <div className='list-discount-price'>
                        <span className="mobile-list-price">MRP <s>&#8377;{Product.listPrice}</s></span>
                        <span className="mobile-dicount-price f-bold-red">GET {discount}% off</span>
                    </div>
                    <div className='mobile-delivery f-bold-red'>{Product.delivery}</div>
                    <div className="disclaimer">
                        <p>
                            Inclusive of all taxes <br /> *This product cannot be returned for a refund or exchange.<br />
                        </p>
                    </div>
                    <div className={`add-to-cart placeorder-button ${displayoff ? "dynamicpage-d-off" : null}`} onClick={() => { cartAddHandler(Product) }}>ADD TO CART</div>
                    <div className={`add-to-cart placeorder-button ${displayoff ? null : "dynamicpage-d-off"}`} onClick={() => { navigate("/cart") }}>GOING TO CART</div>
                    <hr />
                    <div className="highlight-wrapper d-flex-mb-20">
                        <div className="highlight-text no-shrink-grey-text">Highlights</div>
                        <ul>
                            {
                                Product.highlights.map((highlight,index) => {
                                    return (
                                        <li key={index}><span>&#8226;</span> {highlight}</li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <div className="seller-wrapper d-flex-mb-20">
                        <div className="seller-text no-shrink-grey-text">Seller</div>
                        <div className="seller-name">{Product.seller}</div>
                    </div>
                    <div className="description-wrapper d-flex-mb-20">
                        <div className="description-text no-shrink-grey-text">Description</div>
                        <div className='description'>{Product.description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DynamicPage;