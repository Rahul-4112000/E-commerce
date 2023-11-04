import './SellerNavbar.css';
import { useLocation } from 'react-router-dom';
import logo from '../../../Assets/Images/onlinelogomaker-042823-1737-5335-2000-transparent.png';

import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

function SellerNavbar() {

    const location = useLocation();
    const { pathname } = location;
    const [navbarStyle, setNavbarStyle] = useState(false);
    const [navlink, setNavlink] = useState(0);

    const changeNavbarStyle = () => {
        if (window.scrollY >= 50)
            setNavbarStyle(true)
        else
            setNavbarStyle(false)
    }

    useEffect(() => {

        window.addEventListener("scroll", changeNavbarStyle);

        return () => window.removeEventListener;
    });

    const navlinkStyleHandler = (value) => {
        setNavlink(value);
    }


    return (
        <nav className={`seller-navbar ${pathname !== '/become-seller' ? 'd-off' : navbarStyle ? "nav-active" : null}`}>
            <ul >
                <li className='logo'>
                    <Link to="/">
                        <img src={logo} alt='LOGO'></img>
                    </Link>
                </li>
                <li>
                    <Link onClick={() => { navlinkStyleHandler(1) }} smooth to='sell-on-estore' className={`nav-link ${navlink === 1 && 'bottom-border'}`} >Sell On Estore</Link>
                </li>
                <li>
                    <Link onClick={() => { navlinkStyleHandler(2) }} smooth to='perks' className={`nav-link ${navlink === 2 && 'bottom-border'}`} >Perks</Link>
                </li>
                <li>
                    <Link onClick={() => { navlinkStyleHandler(3) }} smooth to='faqs' className={`nav-link ${navlink === 3 && 'bottom-border'}`} >FAQs</Link>
                </li>
            </ul>
            <div className='reg-log-wrapper'>
                <div>Register</div>
                <div>Login</div>
            </div>
        </nav>
    );
}

export default SellerNavbar;

