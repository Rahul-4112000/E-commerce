import { useDispatch, useSelector } from 'react-redux';
import './OrderPlaced.css'
import { useNavigate } from 'react-router-dom';
import { addOrderStatus, addOrders } from '../../Redux/Slices/userDataSlice';
import { useEffect } from 'react';
import { STATUSES } from '../../Redux/Slices/productSlice';


const OrderPlaced = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const orderid = useSelector((state)=> state.userData.orderID )
    const { userDetails, status } = useSelector((state)=> state.userData );

    useEffect(() => {
        if (!localStorage.getItem('order-id'))
            navigate('/');
    }, [])

    useEffect(() => {

        localStorage.setItem('myOrders', JSON.stringify(userDetails));

        const addOrdersToApi = async () => {

            console.log(userDetails, 'userDetails')

            let id = userDetails.id;

            dispatch ( addOrderStatus(STATUSES.LOADING))

            try {

                console.log(id,'id')

                const response =  await fetch(`http://localhost:3000/user/${id}`,{

                    method:"PUT",

                    headers:{
                        "Accept":"application/json",
                        "Content-Type":"application/json"
                    },

                    body: JSON.stringify(userDetails)
                });

                console.log(response,'response');

                dispatch( addOrderStatus(STATUSES.IDLE));

            } catch {

                console.log("error in api")

            }

        }

        addOrdersToApi();
        
    },[userDetails])

    // dispatch(addOrders(cartitems))
    

    const refreshPage = (path) => {
        localStorage.removeItem('cartItems');
        localStorage.removeItem('order-id');
        navigate(path);
        window.location.reload();
    }


    if( status === STATUSES.LOADING) {
        return(
            <div> ORDERS IS PLACING PLEASE, WAIT A MOMENT </div>
        )
    }
    

    return (
        <div className='purchased-container'>
            <div className='purchased-wrapper'>
                <img src='https://cdn-icons-png.flaticon.com/512/3759/3759041.png' alt='order-placed'></img>
                <h4>Your Order Placed Successfully</h4>
                <div>Order ID: {orderid}</div>
                <div>Thank You for Choosing Flipkart</div>
                <div className='order-home-buttons'>

                    <div className='placeorder-button no-shrink' onClick={() => { refreshPage('/myorderslist') }}>My Orders</div>

                    <div className='placeorder-button no-shrink' onClick={() => { refreshPage('/') }}>Shop More</div>

                </div>
            </div>
        </div>
    );
}

export default OrderPlaced;