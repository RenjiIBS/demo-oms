import React, { useState } from 'react'
import './styles.css'
import car from '../../../assets/params/images/icon/car.svg';
import shop from '../../../assets/params/images/icon/shop.svg'
import restaurant from '../../../assets/params/images/icon/restaurant.svg'
import launge from '../../../assets/params/images/icon/launge.svg'
import spa from '../../../assets/params/images/icon/spa.svg'
import pasengerService from '../../../assets/params/images/icon/pasenservice.svg'
import dutyFree from '../../../assets/params/images/icon/dutyFree.svg'
import popular from '../../../assets/params/images/icon/popular.png'
import recent from '../../../assets/params/images/icon/recent.svg'
import fav from '../../../assets/params/images/icon/fav.svg'
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

const serviceList = [
  {
    icon: car,
    title: 'Parking',
    reference:"#"
  },
  {
    icon: shop,
    title: 'Shopping',
    reference:"#"
  },
  {
    icon: restaurant,
    title: 'Restaurant',
    reference:"#"
  },
  {
    icon: launge,
    title: 'Lounge',
    reference:"#"
  },
  {
    icon:spa ,
    title: 'Spa',
    reference:"#"
  },
  {
    icon: pasengerService,
    title: 'Passenger Services',
    reference:"#"
  },
  {
    icon:dutyFree ,
    title: 'Duty-Free Products',
    reference:"#"
  },
  {
    icon: popular,
    title: 'Popular',
    reference:"#"
  },
  {
    icon: recent,
    title: 'Recent',
    reference:"#"
  },
  {
    icon:fav ,
    title: 'Favorite',
    reference:"/favourites"
  }
]
const Services = ({ selectedService, handleServiceSelect }) => {
  const [currentSelectedService, setCurrentSelectedService] = useState(selectedService);

  const toggleSelectedService = (title) => {
    setCurrentSelectedService(currentSelectedService === title ? '' : title);
    handleServiceSelect(currentSelectedService === title ? '' : title);
  };

  return (
    <div className='main-container'>
      {serviceList.map((ele, index) => {
        return (
          <Service
            key={index}
            data={ele}
            selectedService={currentSelectedService}
            handleServiceSelect={toggleSelectedService}
          />
        );
      })}
    </div>
  );
};

const Service = ({ data, selectedService, handleServiceSelect }) => {
  const isSelected = data.title === selectedService;
  
  const handleClick = () => {
    handleServiceSelect(data.title);
  }

  return (
    <div
      className={`servce-s ${isSelected ? 'selected' : ''}` } aria-label={data.title} id={"filtermenu-"+ data.title}
      onClick={handleClick}
    >
      <Nav.Link as={NavLink} to={data.reference}>
        <div className="item" aria-label={data.title} id={"filtermenudiv-"+ data.title}>
          <img src={data.icon} aria-label={data.title} id={"filtermenuimg-"+ data.title} />
        </div>
        <div className="title" aria-label={data.title} id={"filtermenutitle-"+ data.title}>{data.title}</div>
      </Nav.Link>
    </div>
  );
};


export default Services;


