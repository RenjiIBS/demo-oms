import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from './authActions'
// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  userInfo: null,
  profile: null,
  userToken,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken') // delete token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },

    updateProfile: (state, { payload }) => {
      state.profile = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending ,(state) => {
      state.loading = true
      state.error = null
    })
    .addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.accessToken
    })
    .addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
    })
    .addCase(registerUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
    })
    .addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
    })
  }
})

export const { logout, setCredentials ,updateProfile} = authSlice.actions

export default authSlice.reducer

