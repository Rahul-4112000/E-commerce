import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {  getPaymentInfo } from "../../Redux/Slices/cartSlice";
import {  addToMyorders, oderID } from "../../Redux/Slices/userDataSlice";


const PaymentDetails = ({ booleanvalue, addressDetailsDisplay }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartitems, MRP, price, deliverycharge, totalpayble } = useSelector((state) => state.cart);
    

    const displayoff = booleanvalue;

    let path = '/signIn'

    if (localStorage.getItem("user-info")) {
        path = '/checkout';
    }

    useEffect(() => {
        dispatch(getPaymentInfo());
    }, [cartitems])


    const CreateOrder = () => {
        const orderid = Math.floor((Math.random() * 1e+16) + 1e+15);
        dispatch( addToMyorders([cartitems, orderid, new Date().toDateString() ]))
        dispatch( oderID(orderid));
        localStorage.setItem('order-id',JSON.stringify(orderid));
        navigate('/placeorder')
    }

    return (
        <div className="payment-details-wrapper">
            <h5>PAYMENT DETAILS</h5>
            <div className='payment-details' >
                <div className='mrp-wrapper flex-space-between ' >
                    <div >MRP Total</div>
                    <div>&#8377; {MRP}</div>
                </div>
                <div className='additional-discount-wrapper flex-space-between'>
                    <div>Additional Discount</div>
                    <div>- &#8377; {Math.abs(price - MRP)} </div>
                </div>
                <div className='total-amount-wrapper flex-space-between'>
                    <div>Total Amount</div>
                    <div>&#8377; {price} </div>
                </div>
                <div className='delivery-charge-wrapper flex-space-between'>
                    <div>Delivery Charges</div>
                    {
                        deliverycharge === 0 ? <div className='free-delivery'> Free Delivery </div> : <div>&#8377; {deliverycharge} </div>
                    }
                </div>
                <div className='total-payble-wrapper flex-space-between'>
                    <div>Total Payble</div>
                    <div>&#8377; {totalpayble}  </div>
                </div>
                <div className='placeorder-wrapper flex-space-between'>
                    <div className='flex-dir-col'>
                        <div className='small-payble-text'>Total Payble</div>
                        <div className='large-payble-price'>&#8377; {totalpayble} </div>
                    </div>
                    <div className={` ${displayoff ? 'button-hidden' : null} `}>
                        <Link to={path}>
                            <div className='placeorder-button'>PROCEED</div>
                        </Link>
                    </div>
                    <div className={` ${displayoff ? null : 'button-hidden'} `}>
                        <div className={` ${addressDetailsDisplay ? 'placeorder-button' : 'button-hidden'} `} onClick={CreateOrder}>Place Order</div>
                        <div className={` ${addressDetailsDisplay ? 'button-hidden' : 'disable-placeorder-button'} `}>Place Order</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentDetails;