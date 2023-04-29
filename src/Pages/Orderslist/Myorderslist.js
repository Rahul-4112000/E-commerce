import { useSelector } from 'react-redux';
import './Myorderslist.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Myorderslist = () => {

    const navigate = useNavigate()

    const { myorders } = useSelector((state) => state.userData.userDetails );

    useEffect(()=>{
        if(!localStorage.getItem('user-info'))
            navigate('/')
    },[]);
    
    return (
            <div className='orderslist-wrapper'>
                <h2>My Orders</h2>
                {
                    myorders.map((order,index) => {

                        const { name, url, seller, sellingPrice } = order

                        return (
                            <div className='orderslist' key={ index }>
                                <div className='img'>
                                    <img src={ url } alt='item-img'></img>
                                </div>
                                <div className='names'>
                                    <div className='order-name'>{name}</div>
                                    <div className='seller-name'>Seller: {seller}</div>
                                </div>
                                <div className='price'>
                                    <div className='product-selling-price'>&#8377; {sellingPrice}</div>
                                </div>
                                <div className='date'>
                                    <div className='order-date'>Delivered on {order.orderDate}</div>
                                    <div className='order-status'>Your items has been delivered</div>
                                </div>
                            </div>
                        );

                    })
                }
            </div>
    );
}

export default Myorderslist;