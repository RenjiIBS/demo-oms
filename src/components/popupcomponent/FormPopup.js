import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import fields from './formfields.json';
import './FormPopup.css';

const FormPopup = ({ selectedCard, onClose }) => {
    const { id,name, images, description, serviceItemType, currency, unitPrice} = selectedCard;
  const options = fields.find((field) => field.category === serviceItemType.id)?.fields;

  // Define state variable to hold form data and validation errors
  // Define state variables to hold form data, validation errors, and error message
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (event.target.nodeName === 'SELECT') {
      const selectedOption = event.target.options[event.target.selectedIndex];
      const selectedOptionName = selectedOption.getAttribute('name');
      setFormData((prevData) => ({ ...prevData, [selectedOptionName]: value }));
      setFormErrors((prevErrors) => ({ ...prevErrors, [selectedOptionName]: '' }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
    setErrorMessage(''); // Clear error message whenever the form data is updated
  };
  
  

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form data
    const errors = {};
    options?.forEach((option) => {
      const { label, required, validation } = option;
      const value = formData[option.name];

      // Check required fields
      if (required && (!value || value.trim() === '')) {
        errors[option.name] = `${label} is required`;
      }

      // Check validation rules
      if (value && validation) {
        switch (validation) {
          case 'numeric':
            if (isNaN(value)) {
              errors[option.name] = `${label} must be a number`;
            }
            break;
          case 'email':
            if (!/\S+@\S+\.\S+/.test(value)) {
              errors[option.name] = `${label} must be a valid email address`;
            }
            break;
          case 'mobile':
            if (!/^\d{10}$/.test(value)) {
              errors[option.name] = `${label} must be a valid 10-digit mobile number`;
            }
            break;
          case 'alphanumeric':
            if (!/^[a-zA-Z0-9]*$/.test(value)) {
              errors[option.name] = `${label} must be alphanumeric`;
            }
            break;
          case 'string':
            if (!/^[a-zA-Z ]*$/.test(value)) {
              errors[option.name] = `${label} must be a string`;
            }
            break;
          default:
            break;
        }
      }
    });

    if (Object.keys(errors).length === 0) {
      // Handle form submission here by sending formData to server or performing any other action
      console.log(formData);
      onClose();
    } else {
      // Set error message to display in modal
      setErrorMessage('***Please fix the errors and resubmit the form***');
      setFormErrors(errors);
    }
  };

  return (
    <Modal show={true} onHide={onClose} className="formpop-modal">
      <Modal.Body className="bg-blue">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <img src={images[0]} alt={name} className="formimg-box w-100 mb-3" />
            </div>
            <div className="col-md-6">
              <h4 className="formpop-title">{name}</h4>
              <p className="formpop-desc">{description[0]}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
          {options?.map((option, index) => (
  <div key={index} className="form-form-group">
    <label> {option.label}:
      {option.required && <span className="text-danger">*</span>}</label>
    {option.type === 'select' ? (
      <select name={option.name} className="form-form-control" onChange={handleChange}>
        <option value="" disabled selected hidden></option>

        {option.options.map((value, index) => (
          <option key={index} value={value}  name={option.name}className="form-form-control" onChange={handleChange} >
            {value}
          </option>
        ))}
      </select>
    ) : option.type === 'radio' ? (
      <div>
        {option.options.map((value, index) => (
          <div key={index}>
            <input type="radio" name={option.name} value={value} onChange={handleChange} />
            <label>{value}</label>
          </div>
        ))}
      </div>
    ) : (
      <input
        type={option.type}
        name={option.name}
        className="form-form-control"
        onChange={handleChange}
      />
    )}
    {formErrors[option.name] && (
      <div className="formfield-errors">{formErrors[option.name]}</div>
    )}
  </div>
))}


{errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className='formbottom-buttons'>
            <Button  aria-label={id} id= {"addtocart-" + id} variant="secondary" type="submit" className="formsubmit-button">
              Submit
            </Button>
            <Button variant="secondary" className="formclose-button " onClick={onClose}>
              Close
            </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FormPopup;