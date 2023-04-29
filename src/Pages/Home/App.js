import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';

//HomePage
import Navbar from './Navbar';


//pages
import SignIn from '../SignIn/SignIn'
import Wishlist from '../Wishlist/Wishlist';
import Cart from '../Cart/Cart';
import Page404 from '../Page404/Page404';
import Home from './Home';
import Checkout from '../Checkout/Checkout';
import OrderPlaced from '../OrderCreated/OrderPlaced';
import Myorderslist from '../Orderslist/Myorderslist';     

import Electronics from '../../Components/pages for category/Electronics';
import Appliances from '../../Components/pages for category/Appliances';
import Books from '../../Components/pages for category/Books';
import Fashion from '../../Components/pages for category/Fashion';
import Mobiles from '../../Components/pages for category/Mobiles';
import Toys from '../../Components/pages for category/Toys';
import DynamicPage from '../../Components/pages for category/DynamicPage';
import BookPage from '../../Components/pages for category/BookPage';
import SearchedProducts from '../../Components/pages for category/SearchedProducts';
import Newarrival from '../../Components/pages for category/Newarrival'

import store from '../../Redux/Store/store';
const App = () => {
    
    return (
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/search' element={<SearchedProducts />} />
                        <Route path='/signIn' element={<SignIn />} />
                        <Route path='/dynamicPage' element={<DynamicPage />} />
                        <Route path='/bookpage' element={<BookPage/>} />
                        <Route path='/wishList' element={<Wishlist />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/checkout' element={<Checkout />} />
                        <Route path='/placeorder' element={ <OrderPlaced/> }/>
                        <Route path='/myorderslist' element={ <Myorderslist/> }/>
                        <Route path='/electronics' element={<Electronics />} />
                        <Route path='/appliances' element={<Appliances />} />
                        <Route path='/fashion' element={<Fashion />} />
                        <Route path='/books' element={<Books />} />
                        <Route path='/mobiles' element={<Mobiles />} />
                        <Route path='/toys' element={<Toys />} />
                        <Route path='/newarrival' element={<Newarrival />} />
                        <Route path='/*' element={<Page404 />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
    )
}

export default App;