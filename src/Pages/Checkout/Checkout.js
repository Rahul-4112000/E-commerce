import './Checkout.css';

import PaymentDetails from '../Payment/PaymentDetails';

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

import { getAdress } from '../../Redux/Slices/cartSlice';

const Checkout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartitems } = useSelector((state) => state.cart);
    
    useEffect(()=>{
        if(!((localStorage.getItem('user-info')) && (cartitems.length > 0))){
            console.log("length",cartitems.length);
            navigate('/');
        }
        else console.log("length",cartitems.length);
    },[])

    const [sidebar, setSidebar] = useState(false);
    const [addressData, setAddressData] = useState({
        pincode: '',
        city: '',
        state: '',
        firstname: '',
        lastname: '',
        address: '',
        landmark: '',
        phonenumber: ''
    });

    const addressDetails = useSelector((state) => state.cart.address);

    const { pincode, city, state, firstname, lastname, address, landmark, phonenumber } = addressData;

    const booleanvalue = true;
    let addressDetailsDisplay = false;

    if (addressDetails.pincode)
        addressDetailsDisplay = true;

    const addressHandler = (key) => (event) => {

        setAddressData({ ...addressData, [key]: event.target.value });
    }

    const submitAddress = (event) => {
        event.preventDefault();
        localStorage.setItem('address', JSON.stringify(addressData))
        dispatch(getAdress(addressData));
        setSidebar(false);
    }

    return (
        <div className="checkout-container">

            <h2 className='order-review'>Order Review</h2>
            <h5 className='product-string'>PRODUCTS</h5>

            <div className="checkout-cart-wrapper">

                <div className='adress-cart-container'>

                    <div className="checkout-products">
                        {
                            cartitems.map((item, index) => {

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
                                                                    <span className="product-selling-price">&#8377; {item.sellingPrice}</span>
                                                                </> :
                                                                <>
                                                                    <span className="product-list-price"><s>&#8377;{item.cartListPrice}</s></span>
                                                                    <span className="product-selling-price">&#8377;{item.cartSellingPrice}</span>
                                                                </>
                                                        }
                                                    </div>
                                                    <div className='checkout-qty'> QTY:{item.qty} </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                );
                            })
                        }
                    </div>

                    <div className='address-container'>

                        <div className='title'>
                            <div>DELIVERY ADDRESS</div>
                            <div className='select-address' onClick={() => setSidebar(true)} >SELECT ADDRESS</div>
                        </div>

                        <div className={` ${addressDetailsDisplay ? "address-wrapper" : "d-off"}`}>

                            <h4>{addressDetails.firstname}, {addressDetails.lastname}</h4>

                            <div className='address'>
                                <div>{addressDetails.address}</div>
                                <div>{addressDetails.landmark}</div>
                                <div>{addressDetails.city} - {addressDetails.pincode}, {addressDetails.state}</div>
                                <div>+91 - {addressDetails.phonenumber}</div>
                            </div>

                        </div>

                        <div className={`${addressDetailsDisplay ? "d-off" : "address-note"}`}>Please Select Adress to Place Order</div>

                    </div>

                </div>

                <PaymentDetails addressDetailsDisplay={addressDetailsDisplay} booleanvalue={booleanvalue} />

            </div>

            <div className={` input-address-container ${sidebar ? 'active' : null} `}>
                <div className='input-address-wrapper'>

                    <div className='title'>
                        <span>ADD ADRESS</span>
                        <span className='cross-icon' onClick={() => { setSidebar(false) }}><RxCross2 /></span>
                    </div>

                    <form onSubmit={submitAddress} className='input-address'>
                        <input required placeholder='Pin Code' value={pincode} onChange={addressHandler("pincode")}></input>
                        <input required placeholder='City' value={city} onChange={addressHandler("city")}></input>
                        <input required placeholder='State' value={state} onChange={addressHandler("state")}></input>
                        <input required placeholder='First name' value={firstname} onChange={addressHandler("firstname")}></input>
                        <input required placeholder='Last name' value={lastname} onChange={addressHandler("lastname")}></input>
                        <input required placeholder='Address' value={address} onChange={addressHandler("address")}></input>
                        <input required placeholder='Landmark' value={landmark} onChange={addressHandler("landmark")}></input>
                        <input required placeholder='Phone number' maxLength='10' value={phonenumber} onChange={addressHandler("phonenumber")}></input>
                        <input type="submit" value="SAVE ADDRESS"></input>
                    </form>

                </div>
            </div>

        </div>
    );
}

export default Checkout;