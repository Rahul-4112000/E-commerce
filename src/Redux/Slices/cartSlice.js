import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({

  name: 'cart',

  initialState: {

    cartitems: [],

    address: {

      pincode: '',
      city: '',
      state: '',
      firstname: '',
      lastname: '',
      address: '',
      landmark: '',
      phonenumber: ''

    },

    MRP: 0,

    price: 0,

    deliverycharge: 0,

    totalpayble: 0
  },

  reducers: {
    addtoCart(state, action) {

      if ((typeof action.payload[Symbol.iterator]) === "undefined")

        state.cartitems.push(action.payload)

      else  state.cartitems.push(...action.payload);

    },

    removefromCart(state, action) {
      state.cartitems = state.cartitems.filter((item) => item.name !== action.payload)
    },

    getPaymentInfo(state) {

      let mrp = 0, price = 0, totalpayble = 0;

      state.cartitems.map((item) => {

        if (item.qty === 1) {

          mrp = mrp + item.listPrice;

          price = price + item.sellingPrice;

        }
        else {

          mrp = mrp + item.cartListPrice;

          price = price + item.cartSellingPrice;

        }

        if (price < 500)
          state.deliverycharge = 60;
        else
          state.deliverycharge = 0;

        totalpayble = state.deliverycharge + price;

      });

      state.MRP = mrp;
      state.price = price;
      state.totalpayble = totalpayble;

    },

    changeQuantity(state, action) {

      state.cartitems = state.cartitems.map((item) => {

        if (item.name === action.payload[1]) {

          return { ...item, qty: parseInt(action.payload[0]) }

        }

        return item;

      });

      state.cartitems = state.cartitems.map((item) => {

        if (item.name === action.payload[1]) {

          return { ...item, cartListPrice: item.listPrice * action.payload[0], cartSellingPrice: item.sellingPrice * action.payload[0] }
        }

        return item;

      });

    },

    
    getAdress(state, action) {

      state.address = { ...action.payload }

    }

  },

});

export const { addtoCart, removefromCart, getPaymentInfo, changeQuantity, addOrderIDdate, getAdress } = cartSlice.actions;

export default cartSlice.reducer;
