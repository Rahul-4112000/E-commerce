import { createSlice } from '@reduxjs/toolkit';

export const STATUSES = Object.freeze({

    IDLE: 'idle',

    ERROR: 'error',

    LOADING: 'loading'
})

const productSlice = createSlice({

  name: 'product',

  initialState : {

    apiData: [],

    status:'',

  },

  reducers: {

    setapiData (state, action) {
        state.apiData = action.payload;
    },

    setStatus (state, action) {
        state.status = action.payload;
    },

  }
});


export function fetchProducts() {

    return async function fetchProductThunk (dispatch) {

        dispatch( setStatus(STATUSES.LOADING) );

        try {

            const response = await fetch("http://localhost:3000/Products");
    
            const data = await response.json();

            const Appliances = data.filter((product) => product.category === 'Appliances')
            const Books = data.filter((product) => product.category === 'Books')
            const Electronics = data.filter((product) => product.category === 'Electronics')
            const Fashion = data.filter((product) => product.category === 'Fashion')
            const Mobiles = data.filter((product) => product.category === 'Mobiles')
            const Toys = data.filter((product) => product.category === 'Toys')

            const object = {
                Appliances : [
                    ...Appliances
                ],
                Books : [
                    ...Books
                ],
                Electronics : [
                    ...Electronics
                ],
                Fashion : [
                    ...Fashion
                ],
                Mobiles : [
                    ...Mobiles
                ],
                Toys : [
                    ...Toys
                ]
            }

            dispatch( setapiData( object ));

            dispatch( setStatus(STATUSES.IDLE) );

        } catch {

            dispatch( setStatus(STATUSES.ERROR) );

        }
    }

}

export const { setapiData, setStatus } = productSlice.actions;

export default productSlice.reducer;


