import { createSlice } from '@reduxjs/toolkit'
import { fetchFav } from './authActions'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  fetchFav: null,
  userToken,
  error: null,
  success: false,
  favoriteItems: [],
}

const favSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateFavoriteItems: (state, { payload }) => {
      state.favoriteItems = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFav.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFav.fulfilled, (state, { payload }) => {
        state.loading = false
        state.fetchFav = payload
        state.userToken = payload.accessToken
      })
      .addCase(fetchFav.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  },
})

export const {
  updateFavoriteItems
} = favSlice.actions

export default favSlice.reducer
