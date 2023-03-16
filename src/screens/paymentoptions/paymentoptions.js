import React, { useState, useEffect } from "react";
import axios from "axios";
import './paymentoptions.css';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { removeCartItemById} from '../../redux/features/cart/cartslice';

function PaymentOptions() {
  const [paymentOptions, setPaymentOptions] = useState([]);

  useEffect(() => {
    axios.get('payment_options.json').then((response) => {
      setPaymentOptions(response.data[0]);
    });
  }, []);

  return (
    <div className="paymentoptions_container">
      {paymentOptions.paymentOptions && paymentOptions.images && paymentOptions.paymentOptions.map((option, index) => (
        <div key={index} className="paymentoptions_selectpayment">
          <input type="radio" id={`option${index}`} name="paymentOption" value={option} />
          <label htmlFor={`option${index}`}>
            <img src={paymentOptions.images[index]} alt={option} />{option}
          </label>
        </div>
      ))}
    </div>
  );
}

function PaymentForm() {
  const navigate = useNavigate();
  const flightInCart = useSelector(state => state.cart.cart.flight);
  const dispatch = useDispatch();


  const handleCartDelete = (flightno,id) => {
    dispatch(removeCartItemById({ flightno,id}))
  }
  const handleBuyNow = () => {
    var keyid = Object.keys(flightInCart)
    // Delete all selected items from the cart
    keyid.forEach((key, index) => {
    flightInCart[key].forEach((item, index) => {
      if (item.selected) {
        handleCartDelete(key, item.id);
      }
    });
  })
    navigate("/paymentconfirmation");
  }
  return (
    <form className="paymentform_container">
      <h4>Select a payment method</h4>
      <div className="paymentoptions_row">
        <PaymentOptions />
      </div>
      <div className="paymentform_container_paynowbutton">
          <button type="submit" className="btn btn-primary" onClick={handleBuyNow}>
            Pay Now
          </button>
        </div>
    </form>
  );
}

export default PaymentForm;
