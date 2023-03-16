import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cartsubtotal = () => {
  const navigate = useNavigate();

  const handlePayNowClick = () => {
    navigate('/paymentoptions');
  };

  return (
   
      <div className="subtotal-container">
        <div className='item-cal mt-4 pt-4 '>
        <div className="row">
          <div className="col">
            <span className='subtotal-txt'>Sub Total:</span> 
          </div>
          <div className="col">
            <span className='currency'>USD </span>
            <span className='currency'></span>  
          </div>
        </div>
        <div className="row">
          <div className="col">
            <span>Tax:</span> 
          </div>
          <div className="col">
            <span className='currency'>USD </span>
            <span className='currency'>49</span>  
          </div>
        </div>
        <div className="row">
          <div className="col">
           <span className='total-txt'>Total:</span> 
          </div>
          <div className="col">
            <span className='total-txt'>USD </span>
            <span className='total-txt'></span>  
          </div>
        </div>
        </div>
        <div className="row ">
          <div className="col  pay-col">
            <button className='pay-now' onClick={handlePayNowClick}>Pay Now</button>
          </div>
        </div>
      </div>
    
  )
}

export default Cartsubtotal
