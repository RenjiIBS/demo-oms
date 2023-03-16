import React from 'react';
import './paymentconfirmation.css';

const PaymentConfirmation = () => {
  return (
    <div className="confirmation-container">
      <h1>Payment Confirmed</h1>
      <p>Thank you for your payment. Your booking has been confirmed.</p>
      <div className="confirmation-container-offer-container">
        <h2>Grab the Offers before you leave</h2>
        <div className="confirmation-container-offer-carousel">
          <div className="confirmation-container-offer-item">
            <h4>Valet Parking</h4>
            <img src="https://smsvalet.com/wp-content/uploads/2016/11/How-TEZ-Is-Changing-the-Way-You-Valet.jpg" alt="Offer 1" />
            <p>Say goodbye to parking stress and frustration</p>
            <a href="#" className="confirmation-container-button">Book Now</a>
          </div>
          <div className="confirmation-container-offer-item">
            <h4>Chair Massage</h4>
            <img src="https://media.istockphoto.com/id/817455136/photo/young-woman-relaxing-on-the-massaging-chair.jpg?s=612x612&w=0&k=20&c=5u22nsXZzry4VOGp81VK43b28E5MfMgwVzWY7qKMUbw=" alt="Offer 2" />
            <p>Experience the ultimate relaxation with our chair massage</p>
            <a href="#" className="confirmation-container-button">Book Now</a>
          </div>
          <div className="confirmation-container-offer-item">
            <h4>Terminal Parking</h4>
            <img src="https://thenewswheel.com/wp-content/uploads/2017/05/Feature-760x507.jpg" alt="Offer 3" />
            <p>Park your vehicle at affordable rates</p>
            <a href="#" className="confirmation-container-button">Book Now</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentConfirmation;
