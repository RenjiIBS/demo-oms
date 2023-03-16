import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../screens/home/home';
import Notfound from '../screens/not-found/not-found';
import PrivateRoute from "../components/routing/private";


//import WishList from '../screens/wishlist/wishlist';
const About = React.lazy(() => import('../screens/about/about'));
const Login = React.lazy(() => import('../screens/login/login'));
const Signup = React.lazy(() => import('../screens/signup/signup'));
const TravelPlan = React.lazy(() => import('../screens/travelplan/travelplan'));
const WishList = React.lazy(() => import('../screens/wishlist/wishlist'));
const Favourites = React.lazy(() => import('../screens/favourites/favourites'));
const CartPage = React.lazy(() => import('../screens/cart'));
const AddtoFav = React.lazy(() => import('../screens/favourites/favourites'));
const PaymentOptions = React.lazy(() => import('../screens/paymentoptions/paymentoptions'));
const Cartsubtotal = React.lazy(() => import('../components/layout/cartitems/cartsubtotal'));
const PaymentConfirmation = React.lazy(() => import('../screens/paymentconfirmation/paymentconfirmation'));
const JurneyPlan =  React.lazy(() => import('../screens/jurneyplan'));

class AppRouting extends React.Component {

  render() {
    return (
      <Routes>
                <Route path="/" element={<Suspense fallback={<>...</>}><Login /></Suspense>} />
        <Route path="/home/*" element={<Home />} />
        <Route path="about/*" element={<Suspense fallback={<>...</>}><About /></Suspense>} />
        <Route path="login/*" element={<Suspense fallback={<>...</>}><Login /></Suspense>} />
        <Route path="signup/*" element={<Suspense fallback={<>...</>}><Signup /></Suspense>} />
        <Route path="/jurneyplan" element={<Suspense fallback={<>...</>}><JurneyPlan /></Suspense>} />
        <Route path="/wishlist" element={<Suspense fallback={<>...</>}><PrivateRoute><WishList /></PrivateRoute></Suspense>} />
        <Route path="/cart" element={<Suspense fallback={<>...</>}><CartPage /></Suspense>} />
        <Route path="/favourites" element={<Suspense fallback={<>...</>}><PrivateRoute><AddtoFav /></PrivateRoute></Suspense>} />
        <Route path="/paymentoptions" element={<Suspense fallback={<>...</>}><PaymentOptions /></Suspense>} />
        <Route path="/cartsubtotal" element={<Suspense fallback={<>...</>}><Cartsubtotal /></Suspense>} />
        <Route path="/paymentconfirmation" element={<Suspense fallback={<>...</>}><PaymentConfirmation /></Suspense>} />
        <Route path="/favourites" element={<Suspense fallback={<>...</>}><AddtoFav /></Suspense>} />
        {/* <Route path="/jurneyplan" element={<Suspense fallback={<>...</>}><JurneyPlan /></Suspense>} /> */}
        <Route path="*" element={<Notfound />} />

      </Routes>
    )
  }

}

export default AppRouting;