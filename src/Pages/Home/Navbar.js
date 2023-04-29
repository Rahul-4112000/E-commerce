import './Navbar.css'

import logo from '../../Assets/Images/onlinelogomaker-042823-1737-5335-2000-transparent.png'
// import logo from '../../Assets/Images/logo.jpg'

import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai'
import { FcSearch } from 'react-icons/fc'
import { IoBagHandleOutline } from 'react-icons/io5'
import { RiArrowDownSLine, RiLoginCircleLine, RiLogoutCircleLine } from 'react-icons/ri'
import { FaSellcast } from 'react-icons/fa'
import { GiShoppingCart } from 'react-icons/gi'
import { BsWallet2 } from 'react-icons/bs'

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { fetchProducts } from '../../Redux/Slices/productSlice';
import { addtoCart, getAdress } from "../../Redux/Slices/cartSlice";
import { addtowishlist } from "../../Redux/Slices/wishlistSlice";
import { addOrders, addUser } from "../../Redux/Slices/userDataSlice";
import { addSearchData } from "../../Redux/Slices/searchDataSlice";

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchContainer = useRef();

    const cart = useSelector((state) => state.cart.cartitems);
    const wishlist = useSelector((state) => state.wishlist)
    const { userData, navbarOff } = useSelector((state) => state);

    const [rotateArrow, setRotateArrow] = useState(false);
    const [isDisplayOn, setDisplayOn] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [searchlistDisplayon, setsearchlistDisplayon] = useState(false)
    const [navbarStyle, setNavbarStyle] = useState(false)

    const { userDetails } = userData;

    let userfound = false;

    if (localStorage.getItem("user-info")) {
        userfound = true;
    }

    const classHandler = () => {
        setDisplayOn(!isDisplayOn);
        setRotateArrow(!rotateArrow);
    }

    const logOut = () => {
        localStorage.removeItem('user-info');
        localStorage.removeItem('address');
        localStorage.removeItem('myOrders');
        window.location.reload(true);
    }

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    useEffect(() => {
        if (localStorage.length > 0) {

            const fetchDatafromLS = (condition, action, key) => {
                if (condition) {
                    const Data = JSON.parse(localStorage.getItem(key));
                    dispatch(action(Data));
                }
            }

            if (localStorage.getItem('user-info')) {

                const wishlistLength = JSON.parse(localStorage.getItem('wishList'));
                const CartLength = JSON.parse(localStorage.getItem('cartItems'));
                const address = JSON.parse(localStorage.getItem('address'));
                const userInfo = JSON.parse(localStorage.getItem('user-info'));
                const userData = JSON.parse(localStorage.getItem('myOrders'));

                fetchDatafromLS(userInfo, addUser, 'user-info');
                fetchDatafromLS(CartLength, addtoCart, 'cartItems');
                fetchDatafromLS(wishlistLength, addtowishlist, 'wishList');
                fetchDatafromLS(address, getAdress, 'address');
                fetchDatafromLS(userData, addOrders, 'myOrders');
            }
            else {
                const checkWishlist = JSON.parse(localStorage.getItem('noUserWishlist'));
                const checkCartitems = JSON.parse(localStorage.getItem('noUserCartItems'));

                fetchDatafromLS(checkWishlist, addtowishlist, 'noUserWishlist');
                fetchDatafromLS(checkCartitems, addtoCart, 'noUserCartItems');
            }
        }

    }, []);

    useEffect(() => {

        const fetchData = async () => {

            let resp = await fetch(`http://localhost:3000/Products?q=${searchInput}`)

            resp = await resp.json();

            setSearchData(resp);

        }

        if (searchInput !== '')
            fetchData()

    }, [searchInput])

    useEffect(() => {

        window.addEventListener("scroll",changeNavbarStyle)
        document.addEventListener('click',checkElement)

        return () => window.removeEventListener;
    });

    const checkElement = (event) => {
        if(!searchContainer.current.contains(event.target))
            stateValueHandler(setsearchlistDisplayon,false);
    }

    const changeNavbarStyle = () => {
        if(window.scrollY >= 50)
            setNavbarStyle(true)
        else 
            setNavbarStyle(false)
    }

    const searchHandler = (event) => {
        setSearchInput(event.target.value);
        if(event.target.value === '')
            setsearchlistDisplayon(false);
        else 
            setsearchlistDisplayon(true)
    }

    const searchListHandler = (event) => {
        event.preventDefault();

       if(event.target[0].value === '')
        return null;

        setSearchInput('');

        setsearchlistDisplayon(false);
        dispatch(addSearchData(searchData))
        navigate('/search');
    }

    const stateValueHandler = (setValue,Value) => {
        setValue(Value);
    }
    

    return (
        <nav className={`${navbarStyle ? "nav-active" : null }`}>
            <ul className="navigation">

                <li onClick={() => setSearchInput('')} className='logo'>
                    <Link to="/">
                        <img src={logo} alt='LOGO'></img>
                    </Link>
                </li>
                <div className='navbar-list'>
                    <div className="search-container" ref={searchContainer}>

                        <li className={`${navbarOff ? "search-d-off" : 'nav-search'}`}>
                            <form onSubmit={searchListHandler}>
                                <input type='text' className="search-field" placeholder='Search for Products Brands and More' value={searchInput} onChange={searchHandler} onFocus={() => { stateValueHandler(setsearchlistDisplayon,true) } } ></input>
                                <span className='nav-search-icon'><FcSearch /></span>
                            </form>
                        </li>

                        <div className={`search-list ${searchlistDisplayon ? null : "search-d-off" }`}>
                            {
                                searchData.map((searchItem, index) => {

                                    const { name, url } = searchItem;

                                    return (

                                        <div className="search-item" key={index} onClick={() => {  navigate('/dynamicPage', { state: searchItem } ); stateValueHandler(setsearchlistDisplayon,false); stateValueHandler(setSearchInput,'') } } >

                                            <img src={url} alt="item"></img>

                                            <span className="item-name">{name}</span>

                                        </div>
                                    )

                                })
                            }

                        </div>

                    </div>

                   

                    <div className={`${navbarOff ? "d-off" : "navbar-bottom"}`}>

                        <div className={`${userfound ? "d-off" : "d-flex"}`}>
                            <li>
                                <Link to="/signIn">
                                    <span className='nav-icon'> <RiLoginCircleLine /> </span>
                                    <span className='nav-icon-text'>Sign In</span>
                                </Link>
                            </li>
                        </div>

                        <div  onMouseEnter={classHandler} onMouseLeave={classHandler} className={` user-profile ${userfound ? "d-flex" : "d-off"}`}>

                            <li  >
                                <span className='nav-icon'> <AiOutlineUser /> </span>
                                <span className='nav-icon-text'>{userDetails.firstName}</span>
                                <span className={` arrow nav-icon ${rotateArrow ? "arrow-rotated " : null}`}> <RiArrowDownSLine /> </span>
                            </li>

                            <div className={`profile-container   ${isDisplayOn ? null : "d-off"}`}>
                                {/* <div className='arrow-up'></div> */}
                                <div className='profile-wrapper'>
                                    <Link to='/myorderslist'>
                                        <span className='nav-icon'><IoBagHandleOutline /></span>
                                        <span className='text'>My orders</span>
                                    </Link>

                                    <div onClick={logOut} className='log-out'>
                                        <span className='nav-icon logout-icon'><RiLoginCircleLine /></span>
                                        <span className='text'>Logout</span>
                                    </div>

                                </div>
                            </div>

                        </div>

                       
                        <li className='seller'>
                            <Link to="/becomeseller">
                                <span className='nav-icon'> <BsWallet2 />  </span>
                                <span className='nav-icon-text'>Become Seller</span>
                            </Link>
                        </li>

                       

                        <li className='wishlist'>
                            <Link to="/wishList">
                                <span className='nav-icon'> <AiOutlineHeart /> </span>
                                <span className='nav-icon-text'>Wishlist</span>
                                {
                                    wishlist.length > 0 && <span className='length'>{wishlist.length}</span>
                                }
                            </Link>
                        </li>

                        

                        <li className='cart'>
                            <Link to="/cart">
                                <span className='nav-icon'> <GiShoppingCart /> </span>
                                <span className='nav-icon-text'>Cart</span>
                                {
                                    cart.length > 0 && <span className='length'>{cart.length}</span>
                                       
                                }
                            </Link>
                        </li>

                    </div>
                </div>

            </ul>
        </nav>
    );
}

export default Navbar;