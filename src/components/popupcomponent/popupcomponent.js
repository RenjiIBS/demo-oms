import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './pop.css'
import fields from './fields.json';
import FormPopup from './FormPopup';

const PopupComponent = ({ selectedCard, onClose }) => {
  const {id, name, images, description, serviceItemType, currency, unitPrice, offerPrice} = selectedCard;
  const [showForm, setShowForm] = useState(false);

  const handleAddToCart = () => {
    setShowForm(true);
  };
  const handleFormClose = () => {
    setShowForm(false);
    onClose();
  };
  const options = fields.find((field) => field.category === serviceItemType.id)?.fields;

  return (
    <>
      {!showForm && (
        <Modal show={true} onHide={onClose} className="cartpop-modal">
          <Modal.Body className="bg-blue">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <img src={images[0]} alt={name} className="cartpopimg-box w-100 mb-3" />
                </div>
                <div className="col-md-6">
                  <h4 className="cartpop-title">{name}</h4>
                  <p className="cartpop-desc">{description[0]}</p>
                  {offerPrice? <h4 className="pop-price">{currency}{offerPrice}</h4>:<h4 className="pop-price">{currency}{unitPrice}</h4>}
                </div>
              </div>

              {options && (
                <div className='cartpopfields-container'>
                  {options.map((option, index) => (
                    <div key={index} className="cartpopform-group">
                      <label>{option.label}:</label>
                      {option.type === 'select' ? (
                        <select name={option.name} className="cartpopform-control">
                          <option value="" disabled selected hidden></option>
                          {option.options.map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                          ))}
                        </select>
                      ) : (
                        <input type={option.type} name={option.name} className="cartpopform-control" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" aria-label={id} id= {"addtocart-" + id} className="cartpopbottom-buttons" onClick={handleAddToCart}>
              Add to cart
            </Button>
            <Button variant="secondary" className="cartpopbottom-buttons" onClick={onClose}>
              close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {showForm && (
         <FormPopup selectedCard={selectedCard} onClose={handleFormClose} />
      )}
    </>
  );
};

export default PopupComponent;