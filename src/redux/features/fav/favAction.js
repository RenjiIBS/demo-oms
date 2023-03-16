import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const backendURL = process.env.REACT_APP_REST_API_URL || "http://localhost:8080";
const FETCH_FAV_URL =  backendURL + "/api/v1/airportservicestype/additemtofavourite";
const bearerToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

console.log(FETCH_FAV_URL)
export const fetchFav = createAsyncThunk(
  'favorites/add',
  async (inputJson, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type" : 'application/json',
          Authorization : `Bearer ${bearerToken}`
        },
      }
      const { data } = await axios.patch(
        FETCH_FAV_URL,
        inputJson,
        config
      )
      console.log("inside fetchFav data ->",data)
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
);
