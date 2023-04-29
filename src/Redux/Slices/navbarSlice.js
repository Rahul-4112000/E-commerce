import { createSlice } from "@reduxjs/toolkit";


const navbarSlice = createSlice({

    name: 'navbarOff',

    initialState : false,

    reducers : {
        navbarToggle (state, action) {
           return action.payload
        }
    }
})

export const { navbarToggle } = navbarSlice.actions ;
export default navbarSlice.reducer