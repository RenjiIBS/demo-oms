import './Minicard.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';



const Minicard = ({ product, width, height }) => { 
     return (
    <div className="mini-product-card" style={{ width: `${width}px`, height: `${height}px`, backgroundColor: 'white' }} >
         <div className="mini-product-card-container">
              <div className="mini-title-container">
                   <h5 className="mini-product-card-title">{product.name}</h5>
                   </div> 
                   <div className="mini-image-container">
                        <img className="mini-card-image" src={product.images[0]} alt={product.name} />
                        </div>
                        <div className="mini-product-card-icons">
                             <RiDeleteBin6Fill className="mini-card-cart" />
                             <div className='mini-price-tag'>${product.unitPrice}</div>
                             <FaEdit className="mini-card-cart" />
                             </div>
                             </div>
                             </div> 
                             )}

                             export default Minicard;
