import { createSlice } from "@reduxjs/toolkit";


const searchDataSlice = createSlice({

    name: 'searchedData',

    initialState : [],

    reducers : {

        addSearchData(state, action) {
           return action.payload
        }
    }
})

export const { addSearchData } = searchDataSlice.actions ;
export default searchDataSlice.reducer; 