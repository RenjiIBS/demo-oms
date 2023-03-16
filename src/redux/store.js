import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import { authApi } from './services/auth/authService'
import pingflightReducer from './features/pingFlight/pingflightSlice'
import pinInspirationReducer from './features/pinInspiration/pinInspirationSlice'
import locationListReducer from './features/pinInspiration/locationListSlice'
import flightListReducer from './features/pingFlight/flightListSlice'
import serviceReducer from './features/airportService/airportServiceSlice';
import offerReducer from './features/airportOffers/offerSlice'
import cartReducer from './features/cart/cartslice'
import comnReducer from './features/common/commonSlice'
import storage from 'redux-persist/lib/storage'
import {UnauthenticatedMiddleware}  from './unauthenticatedmiddleware'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import {  persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['authApi'],
}

export const rootReducers = combineReducers({
  auth: authReducer,
  flight:pingflightReducer,
  services: serviceReducer,
  offers: offerReducer,
  cart: cartReducer,
  inspiration: pinInspirationReducer,
  locations: locationListReducer,
  flights: flightListReducer,
  [authApi.reducerPath]: authApi.reducer,
  common: comnReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware , UnauthenticatedMiddleware),
})

setupListeners(store.dispatch)

export let persistor = persistStore(store)
