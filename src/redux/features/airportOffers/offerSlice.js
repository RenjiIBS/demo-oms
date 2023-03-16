import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = process.env.REACT_APP_REST_API_URL || "http://localhost:8080";
// const backendURL = "http://localhost:8080";

// Define the initial state
const initialState = {
    offers: [],
    error: null,
    loading: false,
};

// Define the async thunk for fetching offers
export const fetchOffers = createAsyncThunk(
    'offers/fetchOffers',
    async () => {
        const response = await axios.get(`${backendURL}/api/v1/airportoffers`);
        console.log("airportoffers: "+JSON.stringify(response.data)); // log the response data
        return response.data;
        }
);

// Define the offers slice
const offersSlice = createSlice({
    name: 'offers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchOffers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchOffers.fulfilled, (state, action) => {
            state.loading = false;
            state.offers = action.payload;
        })
        .addCase(fetchOffers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});



// Export the action creators
export const offerActions = {
    fetchOffers,
};
export default offersSlice.reducer;