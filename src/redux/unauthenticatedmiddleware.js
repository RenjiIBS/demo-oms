import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { Navigate, useLocation } from 'react-router-dom';


export  const UnauthenticatedMiddleware  = ({

}) => (next) => (action) => {
 
 if (isRejectedWithValue(action) && action.payload.status === 401) {

    console.log("Unauthorized request!")
    
 }

 return next(action);
};
