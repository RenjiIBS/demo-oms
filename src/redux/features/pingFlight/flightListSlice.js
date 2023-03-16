import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = process.env.REACT_APP_REST_API_URL || "http://localhost:8080";
// const backendURL = "http://localhost:8080";

// Define the initial state
const initialState = {
    flights: [],
    error: null,
    loading: false,
};
// const backendURL = 'http://127.0.0.1:8080' 
// `${backendURL}/api/v1/flightschedule/${date}`
// '/flight_schedule.json'
// Define the async thunk for fetching flights  flight_schedule
// const response = await axios.get(`${backendURL}/api/v1/flightschedule/${date}`);

export const fetchFlights = createAsyncThunk(
    'flights/fetchFlights',
    async (date) => {
        const response = await axios.get(`${backendURL}/api/v1/flightschedule/${date}`);
        const modifiedData = response.data.map(flight => {
            return {
                ...flight,
                label: `${flight.flightNo} | ${flight.scheduleTime} | ${flight.source}-${flight.destination} `
            };
        });
        return modifiedData;
        }
);

// Define the flightList slice
const flightListSlice = createSlice({
    name: 'flights',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchFlights.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchFlights.fulfilled, (state, action) => {
            state.loading = false;
            state.flights = action.payload;
        })
        .addCase(fetchFlights.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});



// Export the action creators
export const flightActions = {
    fetchFlights,
};
export default flightListSlice.reducer;