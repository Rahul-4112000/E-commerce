import { createSlice } from "@reduxjs/toolkit";


const wishlistSlice = createSlice({

    name: 'wishlist',

    initialState: [],

    reducers: {

        addtowishlist(state, action) {

            if ((typeof action.payload[Symbol.iterator]) === "undefined")

                state.push(action.payload);

            else

                state.push(...action.payload);
        },

        removeFromWishlist(state,action) {

          return state.filter( item => item.name !== action.payload )  

        },

        moveToCart(state, action) {

            return state.filter((wishlistitem) => wishlistitem.id !== action.payload);
            
        }
    }
});

export const { addtowishlist, removeFromWishlist, moveToCart } = wishlistSlice.actions;

export default wishlistSlice.reducer;