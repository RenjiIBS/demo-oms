
import React from 'react';
import AppRouting from './app-routing';
import './app.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Header from '../components/layout/header'
import Footer from '../components/layout/footer'
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />
    
        <main>

          <AppRouting />

        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )


}

export default App;