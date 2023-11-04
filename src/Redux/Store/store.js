import { configureStore } from "@reduxjs/toolkit";

import  cartSlice  from '../Slices/cartSlice'
import wishlistReducer from "../Slices/wishlistSlice";
import productReducer from '../Slices/productSlice';
import userDataSlice from "../Slices/userDataSlice";
import searchDataSlice from "../Slices/searchDataSlice";

const store = configureStore({

    reducer : {

        cart : cartSlice,

        wishlist: wishlistReducer,

        product: productReducer,

        userData: userDataSlice,

        searchData: searchDataSlice

    },
    
})

export default store;