import { configureStore } from "@reduxjs/toolkit";

import  cartSlice  from '../Slices/cartSlice'
import wishlistReducer from "../Slices/wishlistSlice";
import productReducer from '../Slices/productSlice';
import userDataSlice from "../Slices/userDataSlice";
import navbarSlice from "../Slices/navbarSlice";
import searchDataSlice from "../Slices/searchDataSlice";

const store = configureStore({

    reducer : {

        cart : cartSlice,

        wishlist: wishlistReducer,

        product: productReducer,

        userData: userDataSlice,

        navbarOff: navbarSlice,

        searchData: searchDataSlice

    },
    
})

export default store;