import React, { useState, useEffect } from 'react';
import './home.css';
import ProductCard from '../../components/productcard/productcard';
import { connect } from 'react-redux';
import { serviceActions } from '../../redux/features/airportService/airportServiceSlice';
import { offerActions } from '../../redux/features/airportOffers/offerSlice';
import Service from '../../components/layout/services/Hug.jsx';
import offerItems from './offers.json';
import axios from 'axios';
function Home({ services, offers, fetchServices, fetchOffers}) {
  const [selectedService, setSelectedService] = useState(null);
  const [oderedrData, setOderedrData] = useState(null);
  const [data, setData] = useState(null);


const getData = async() =>{
  const result = await axios.post('https://ybhxg44xf1.execute-api.ap-south-1.amazonaws.com/default/get_recommendation_dxi', { "user_id": localStorage.getItem("userToken") });
  console.log("Data ",result.data)
  setData(result.data);
  return  result;
}
  useEffect(() => {
    if(localStorage.getItem("orderItems") ){
      setData(JSON.parse(localStorage.getItem("orderItems")));
    }
   if(data == null)    getData();
  }, [fetchServices, fetchOffers,data]);

  const handleServiceSelect = (serviceTitle) => {
    setSelectedService((prevSelectedService) =>
      prevSelectedService === serviceTitle ? null : serviceTitle
    );
  };
  

const filteredServices = selectedService ? services.filter(service => {
  return service.serviceItemType.serviceType === selectedService;
}) : services;
const filteredOffers = selectedService ? offers.filter(offer => {
  return offer.serviceItemType.serviceType === selectedService;
}) : offers;

  const interleavedItems = [];
  let serviceIndex = 0;
  let offerIndex = 0;
  while (serviceIndex < filteredServices.length || offerIndex < filteredOffers.length) {
    if (serviceIndex < filteredServices.length) {
      interleavedItems.push(filteredServices[serviceIndex]);
      serviceIndex++;
    }
    if (serviceIndex < filteredServices.length) {
      interleavedItems.push(filteredServices[serviceIndex]);
      serviceIndex++;
    }
    if (offerIndex < filteredOffers.length) {
      interleavedItems.push(filteredOffers[offerIndex]);
      offerIndex++;
    }
  }
  
  return (
    <div>
    <Service handleServiceSelect={handleServiceSelect} />
    <div className="service-tile-container py-5" >
      <div className="row pt-2">
   
        {data && data.items && Object.keys(data.items).map((item, i) => (
        
        offerItems[item] &&  offerItems[item].length > 0 && offerItems[item].map((offeritem, index1) => (
          <div className="col-15 col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-4 mx-3" key={index1}>
           
            <ProductCard product={offeritem} width={216} height={330}/>

          </div>
        ))))}
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-2">
        </div>
        
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-2">
          
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-2">

        </div>
      </div>
    </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    services: state.services.services,
    offers: state.offers.offers,
  };
};

const mapDispatchToProps = {
  fetchServices: serviceActions.fetchServices,
  fetchOffers: offerActions.fetchOffers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
