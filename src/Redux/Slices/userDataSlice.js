import { createSlice } from "@reduxjs/toolkit";


const userDataSlice = createSlice({

    name: 'userData',

    initialState: {

        userDetails: {
            id: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            retypepassword: "",
            myorders: []
        },

        status:'',

        orderID: '',

    },

    reducers: {
        addUser(state, action) {
            state.userDetails = { ...action.payload }
        },

        addToMyorders(state, action) {

            action.payload[0].map((item) => {
                state.userDetails.myorders.push({...item, orderID: action.payload[1], orderDate: action.payload[2] } ) 
            });

        },

        oderID(state, action) {
            state.orderID = action.payload;
        },

        addOrderStatus(state,action) {
            state.status = action.payload
        },

        addOrders(state, action) {
            const orders = action.payload.myorders
            state.userDetails.myorders.push(...orders);
        }
    }
});

export const { addUser, oderID, addToMyorders, addOrderStatus, addOrders } = userDataSlice.actions;
export default userDataSlice.reducer;