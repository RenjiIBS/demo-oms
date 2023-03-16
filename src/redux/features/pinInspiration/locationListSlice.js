import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = process.env.REACT_APP_REST_API_URL || "http://localhost:8080";
// const backendURL = "http://localhost:8080";

// Define the initial state
const initialState = {
    locations: [],
    error: null,
    loading: false,
};
// const backendURL = 'http://127.0.0.1:8080' 
// `${backendURL}/api/v1/flightschedule/25-${date}`
// '/flight_schedule.json'
// Define the async thunk for fetching locations
export const fetchLocations = createAsyncThunk(
    'locations/fetchlocations',
    async (date) => {
        const response = await axios.get(`${backendURL}/api/v1/flightschedule/month/${date}`);
        console.log("locations: "+JSON.stringify(response.data)); // log the response data
        const locationsSet = new Set(response.data.map((flight) => flight.destLocation));
        const locationList = Array.from(locationsSet);
        console.log("locations: "+ locationList);
        return locationList;
        }
);


// Define the locationListSlice slice
const locationListSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchLocations.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchLocations.fulfilled, (state, action) => {
            state.loading = false;
            state.locations = action.payload;
        })
        .addCase(fetchLocations.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});



// Export the action creators
export const locationActions = {
    fetchLocations,
};
export default locationListSlice.reducer;