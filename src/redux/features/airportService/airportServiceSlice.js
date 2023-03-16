import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = process.env.REACT_APP_REST_API_URL || "http://localhost:8080";
// const backendURL = "http://localhost:8080";

// Define the initial state
const initialState = {
    services: [],
    error: null,
    loading: false,
};
// const backendURL = 'http://127.0.0.1:8080' `${backendURL}/api/v1/airportservices`
// Define the async thunk for fetching services
export const fetchServices = createAsyncThunk(
    'services/fetchServices',
    async () => {
        const response = await axios.get(`${backendURL}/api/v1/airportservices`);
        console.log("airportservices: "+JSON.stringify(response.data)); // log the response data
        return response.data;
        }
);

// Define the services slice
const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchServices.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchServices.fulfilled, (state, action) => {
            state.loading = false;
            state.services = action.payload;
        })
        .addCase(fetchServices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});



// Export the action creators
export const serviceActions = {
    fetchServices,
};
export default servicesSlice.reducer;