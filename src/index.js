import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import './index.css';
import App from './app/app';
const root = ReactDOM.createRoot(document.getElementById('root'));
import {persistor,store} from './redux/store'
root.render(<React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={"loading"} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
</React.StrictMode>
);