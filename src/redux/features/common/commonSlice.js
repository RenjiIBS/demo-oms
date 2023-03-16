import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  option: "flight",
  error: {},
  loading: false,
};



// Define the Cart slice
const commonSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    selectServices: (state, action) => {
      state.option = action.payload.option
    }
  }
});

export const { selectServices } = commonSlice.actions;

export default commonSlice.reducer;


