import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const backendURL = process.env.REACT_APP_REST_API_URL || "http://localhost:8080";
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    //  baseUrl: 'https://redux-user-auth.up.railway.app/',
    baseUrl: backendURL,
    prepareHeaders: (headers, { getState }) => {
     
      const token = getState()?.auth?.userInfo?.accessToken

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
        return headers
      }
    },
  }),
  endpoints: (build) => ({
    getDetails: build.query({
      query: () => ({
        url: 'api/auth/profile',
        method: 'GET',
      }),
    }),
  }),
})

// export react hook
export const { useGetDetailsQuery } = authApi
