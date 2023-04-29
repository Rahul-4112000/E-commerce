import './Carousel.css'
import React, { useRef, useState } from 'react'

import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { useDispatch } from 'react-redux';
import { addtoCart } from '../../Redux/Slices/cartSlice';
import { useNavigate } from 'react-router-dom';

function Carousel({ Products }) {

  const carsouel = useRef();
  const carsouelParent = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMouseEnter, setMouseEnter] = useState('');

  const booleanValueHandler = (value, setState) => {
    setState(value)
  }


  const gotoPreviouseSlide = () => {
    carsouelParent.current.scrollLeft += -carsouel.current.clientWidth;
  }

  const gotoNextSlide = () => {
    carsouelParent.current.scrollLeft += carsouel.current.clientWidth;
  }

  const cartHandler = (item) => {
    dispatch(addtoCart(item));
  }

  return (
    
    <>
    
      <div onClick={gotoPreviouseSlide} className={`coursel-arrow left`}><SlArrowLeft /></div>
      <div onClick={gotoNextSlide} className='coursel-arrow right'><SlArrowRight /></div>

      <div className='coursel-wrapper' ref={carsouelParent}>
        {
          Products.map((item, index) => {

            return (

              <div className='carousel' key={index} ref={carsouel} >

                <div className='card' onMouseEnter={() => booleanValueHandler(index, setMouseEnter)} onMouseLeave={() => booleanValueHandler('', setMouseEnter)}>
                  <img src={item.url} alt="appliance" onClick={() => navigate('/dynamicPage', { state: item } )}></img>
                  <div className={`cart-button ${index === isMouseEnter && "active"}`} onClick={() => { cartHandler(item) } }>ADD TO CART</div>
                </div>

                <div className='content'>
                  <div className='name'>{item.name}</div>
                  <span className='list-price'><s>&#8377;{item.listPrice}</s></span>
                  <span className='selling-price'>&#8377;{item.sellingPrice}</span>
                </div>

              </div>

            )
          })
        }

      </div>

      </>
  )
}

export default Carousel
