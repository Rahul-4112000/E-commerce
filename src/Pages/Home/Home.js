import './Home.css'

import Category from './Category';
import mobile from '../../Assets/Images/vojtech-bruzek-J82GxqnwKSs-unsplash.jpg'
import ImageSlider from './ImageSlider';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Carousel from './Carousel';

function Home() {

  const { cart, wishlist, product } = useSelector((state) => state);
  const { apiData: Products, status } = product
  const { Appliances, Books, Electronics, Fashion } = Products;


  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user-info')))
      localStorage.setItem("cartItems", JSON.stringify(cart.cartitems));
  }, [cart.cartitems]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user-info')))
      localStorage.setItem("wishList", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user-info')))
      localStorage.setItem("noUserCartItems", JSON.stringify(cart.cartitems));
  }, [cart.cartitems]);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user-info')))
      localStorage.setItem("noUserWishlist", JSON.stringify(wishlist));
  }, [wishlist]);


  const categories = [{
    categoryName: "Mobiles",
    url: mobile,
    link: "/mobiles"
  }, {
    categoryName: "Electronics",
    url: "https://images.unsplash.com/photo-1556196148-1fb724238998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGxhcHRvcCUyMGFuZCUyMGVhcnBob25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    link: "/electronics"
  }, {
    categoryName: "Fashion",
    url: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
    link: "/fashion"
  }, {
    categoryName: "Appliances",
    url: "https://media.istockphoto.com/id/513419717/photo/home-appliance.jpg?s=612x612&w=0&k=20&c=p8Lo7aoFUCeZB2jucfIHViKhVFCzsNyU8wJkQqdmLeY=",
    link: "/appliances"
  }, {
    categoryName: "Toys",
    url: "https://images.unsplash.com/photo-1560859251-d563a49c5e4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fHRveXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    link: "/toys"
  }, {
    categoryName: "Books",
    url: "https://plus.unsplash.com/premium_photo-1677187301535-b46cec7b2cc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    link: "/books"
  }];

  if (Products.length === 0) {
    return <h1>Loading</h1>
  }

  return (
    <div className='container'>

      <ImageSlider />

      <div className='category-container center-xp'>
        <div className='category-wrapper'>
          <Category categories={categories} />
        </div>
      </div>

      <div className='coursel-container'>
        <h2>Appliances</h2>
        <Carousel Products={Appliances} />
      </div>

      <div className='coursel-container'>
        <h2>Fashion</h2>
        <Carousel Products={Fashion} />
      </div>

      <div className='coursel-container'>
        <h2>Electronics</h2>
        <Carousel Products={Electronics} />
      </div>
      
      <div className='coursel-container'>
        <h2>Books</h2>
        <Carousel Products={Books} />
      </div>

    </div>
  );
}

export default Home;