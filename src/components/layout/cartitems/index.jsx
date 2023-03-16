import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap';
import Actions from './Actions';
import Cartsubtotal from './cartsubtotal';
import Details from './details';
import Itemimage from './Itemimage';
import Recommendeditem from './recommended';
import { useSelector, useDispatch } from 'react-redux';
import { removeCart, itemSelect, itemUnSelect, selectAll, unSelectAll } from '../../../redux/features/cart/cartslice';
import Accordion from '../accordions/accordions';
import './styles.css';
import axios from 'axios';
import { FaLessThanEqual } from 'react-icons/fa';

const dropDownList = [
  "",
  "parking",
  "Shoping",
  "Spa",
  "Launges"
]

const Displaycart = () => {
  // cart releated data listing here again need to refector once api is avilable
  const flightInCart = useSelector(state => state.cart.cart.flight);
  const { flights } = useSelector(state => state.flights);
  const dispatch = useDispatch();
  let cartKey = Object.keys(flightInCart)
  const handleCartDelete = (itemIndex,key) => {
    // console.log("delete cart called ", itemIndex)
    console.log("Datta Sending to Slice",itemIndex,key)
    dispatch(removeCart({ itemIndex ,flightNo:key}))
  }

  const handleCheckBoxClick = (itemIndex, flightNo) => {
    //console.log("I am selected",Object.keys(flightInCart))
    if (flightInCart[flightNo][itemIndex].selected) {

      dispatch(itemUnSelect({ itemIndex, flightNo }))
    } else {
      // console.log("Not Selected")
      dispatch(itemSelect({ itemIndex, flightNo }))
    }
  }

  const handleSelectAll = () => {
    if (isSelectedAll()) {
      dispatch(unSelectAll({ flights: cartKey }))
    } else {
      dispatch(selectAll({ flights: cartKey }))
    }

  }



  const isSelectedAll = () => {
    let temp = 0;
    let totalCount = 0;
    cartKey.map(key => {
      flightInCart[key].map((ele) => {
        totalCount++
        if (ele.selected) temp++;
      }
      )
    })
    if (!totalCount) return false;

    if (totalCount === temp) return true;

    return false;

  }
  
  function renderCardsOthers(data) {
    return data.map((item, index) => {
      console.log(item.flightnumber);
      if (item.flightnumber === null || typeof item.flightnumber === 'undefined') {
        const cards = item.cartItems.map((cartItem, cartIndex) => (
          <div className="cards d-flex" key={cartIndex}>
            <Itemimage data={cartItem} />
            <Details data={cartItem} />
            <Actions data={cartItem} onDeleteClick={() => handleCartDelete(cartIndex)} />
          </div>
        ));
        return cards;
      }
      return null;
    });
  }
  
  

  function renderCardsAccordion(data) {
    const accordions = data.map((group, index) => {
      if (group.flightnumber) {
        const cards = group.cartItems.map((item, index) => (
          <div className="cards d-flex" key={`${group.serviceType}-${index}`}>
            <Itemimage data={item} />
            <Details data={item} />
            <Actions data={item} onDeleteClick={() => handleCartDelete(index)} />
          </div>
        ));
  
        return (
          <Accordion title={`${group.flightnumber} (${group.destination}) | ${group.date} ${group.time}`} contentBlock={cards} key={index} />
        );
      }
    });
  
    return accordions;
  }
  
  const isSelected = isSelectedAll()
  return (
    <div>
      <div>
        <div className="container">
          <div className='row'>
            <div className='col-md-8'>
              <div className='row'>
                <div className="col-md-6 ">
                  <div className='row'>
                    <div className=" col select-all">

                      <input type="checkbox" onClick={handleSelectAll} checked={isSelected} />
                    </div>
                    <div className="col selectall-text" >
                      Select All
                    </div>
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <div className="col sort-by">Sort By:</div>
                  <div className="col">
                    <select name="products" id="airport" className='prd-sort'>
                      {dropDownList.map(item => {
                        return (
                          <option value={item}>{item}</option>
                        )
                      })}

                    </select></div>
                </div>

              </div>
              <div className='col-md-12'>
                <br />
                {
                  Object.keys(flightInCart).map((key, index) => {
                    const flight = flights.find(ele => ele.flightNo == key);
                    // key is a flight no
                    const cards = flightInCart[key].map((item, index) => (
                      <div className="cards d-flex" key={`${key}-${index}`}>
                        <Itemimage data={item} onCheckBoxClick={() => handleCheckBoxClick(index, key)} />
                        <Details data={item} />
                        <Actions data={item} onDeleteClick={() => handleCartDelete(index,key)} />
                      </div>
                    ));

                    return (
                      <Accordion title={`${flight.flightNo} (${flight.destination}) | ${flight.scheduleDate} ${flight.scheduleTime}`} contentBlock={cards} key={index} />
                    );

                  })
                }

                {/* {(() => {
              const accordions = data.map((group, index) => {
                const cards = group.cartItems.map((item, index) => (
                  <div className="cards d-flex" key={`${group.serviceType}-${index}`}>
                    <Itemimage data={item} />
                    <Details data={item} />
                    <Actions data={item} onDeleteClick={() => handleCartDelete(index)} />
                  </div>
                ));

                return (
                  <Accordion title={`${group.flightnumber} (${group.destination}) | ${group.date} ${group.time}`} contentBlock={cards} key={index} />
                );
              });

              return accordions;
            })()} */}


              </div>

            </div>

            <div className='col-md-4'>
              <Cartsubtotal />
              <Recommendeditem />
            </div>
          </div>

          {/* <div className="row  chkbox-sort">
          <div className="col-md-4 row " style={{ paddingLeft: '0px' }}>
            <div className="col select-all">
              <input type="checkbox" />
            </div>
            <div className="col selectall-text">
              Select All
            </div>
          </div>
          <div className="col-sm-4 row">
            <div className="col sort-by">Sort By:</div>
            <div className="col"><select name="products" id="airport" className='prd-sort'>
              <option value="parking">parking</option>
              <option value="shoping">Shoping</option>
              <option value="spa">Spa</option>
              <option value="launge">Launges</option>
            </select></div>
            
          </div>
          <div className="col">
           <Cartsubtotal />
           </div>
          
          
        </div> */}
        </div>
        {/* <div className="cards d-flex">
          <Itemimage />
          <Details />
          <Actions />
        </div> */}
      </div>
      <div>

        {/* <Recommendeditem /> */}
      </div>
    </div>

  )
}

export default Displaycart;
