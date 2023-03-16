import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  cart:{
    flight:{},
    inspiration:{}
  },
  error: {},
  loading: false,
};

// Define the Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { type, data, flightNumber } = action.payload;
      if (state.cart[type][flightNumber]){
        let arr = state.cart[type][flightNumber];
        // let isExist = arr.filter(item => data.id = item.id).length; /// we will look into this later
        if (arr) {
          arr.push(data)
          state.cart[type] = {
            ...state.cart[type],
            [flightNumber]: arr
          }
        }
      } else {
        let arr = [];
        arr.push(data)
        state.cart[type] = {
          ...state.cart[type],
          [flightNumber]: arr
        }
      }
      
    },
    removeCart: (state, action) => {
      try {

        const {itemIndex,flightNo} =  action.payload
        state.cart.flight[flightNo] = state.cart.flight[flightNo].filter((_, index) => index!=itemIndex)
      } catch (error) {
        console.log("Error while removing cart", error);
      }
      
    },
    itemSelect: (state, action) => {
      const { itemIndex, flightNo } = action.payload;
      state.cart.flight[flightNo] = state.cart.flight[flightNo].map((item, index) => {
        if (index == itemIndex) {
          return {
            ...item,
            selected: true
          }
        }
        return { ...item }
      });
    },
    itemUnSelect: (state, action) => {
      const { itemIndex,flightNo } = action.payload;
      state.cart.flight[flightNo] = state.cart.flight[flightNo].map((item, index) => {
        if (index == itemIndex) {
          return {
            ...item,
            selected: false
          }
        }
        return { ...item }
      });
    },

    selectAll: (state, action) => {
      const { flights } = action.payload;
      for(let i = 0 ; i < flights.length; i++){
        let flightNo =  flights[i]
        state.cart.flight[flightNo] = state.cart.flight[flightNo].map((item, index) => {
          return {
            ...item,
            selected: true
          }
        });
      }
     
    },

    unSelectAll: (state, action) => {
      const { flights } = action.payload;
      for(let i = 0 ; i < flights.length; i++){
        let flightNo =  flights[i]
        state.cart.flight[flightNo] = state.cart.flight[flightNo].map((item, index) => {
          return {
            ...item,
            selected: false
          }
        });
      }
    },
    // Needs to refector this slice once API is ready
    cartError: (state, action) => {
      const error = action.payload?.error || null;
      state.error = error;
    },
    removeCartItemById: (state, action) => { // for removing paid items from the cart
      const { id, flightno } = action.payload;
      const updatedFlight = state.cart.flight[flightno].filter(item => item.id !== id);
      state.cart.flight[flightno] = updatedFlight;
    }

  }
});

export const { addToCart, removeCart, itemSelect, itemUnSelect, selectAll, unSelectAll, removeCartItemById, cartError} = cartSlice.actions;

export default cartSlice.reducer;


