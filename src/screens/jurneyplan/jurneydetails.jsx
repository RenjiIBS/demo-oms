import React,{ useState, useEffect } from 'react';
import arrow from "../travelplan/images/arrow.png";
import add from "../travelplan/images/add.png";
import notifi from "../travelplan/images/notifi.png";
import rem from "../travelplan/images/remove.svg";
import "./jurneyplan.css";
import axios from 'axios';
import Minicard from '../travelplan/Minicard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import {useDispatch, useSelector } from 'react-redux';
import {deleteFlight } from '../../redux/features/pingFlight/pingflightSlice'

const JurneyPlan = ({ optionType, flight }) => {
  const {cart} = useSelector(state => state.cart);
  const itemList = cart[optionType][flight.flightNo];

  const {flights} = useSelector(state => state.flights);
  const flightDetails = flights.length ? flights.filter(item => item.flightNo == flight.flightNo)[0]:{};
  
  const dispatch = useDispatch();
  const handleDelete = (flightDetails) => {
     dispatch(deleteFlight(flightDetails));
   }
  
  const [data, setData] = useState(null); useEffect(() => {
    axios.get('master_data.json')
  .then(response => setData(response.data))
   .catch(error => {
     console.log(error);
     });
    }, []);
     if (!data) { return <div>Loading...</div>; }
  const settings = {  infinite: false, speed: 500, slidesToShow: 5, slidesToScroll: 4,  };
  
  console.log("cart list", itemList)

 


  return (
    <div className="container py-5">
      <div className="row">
        <div className="cardWrap">
          <div className="card cardLeft">
            <div className="row">
              <div className="col order-first col-lg qwer">{flightDetails.source}</div>
              <div className="col center-align qwer">
                <img id="travel-arrow" src={arrow} />
              </div>
              <div className="col order-last qwer">{flightDetails.destination}</div>
            </div>
            <div className="row">
              <div className="col"><br /></div>
            </div>
            <div className="row">
              <div className="col"><br /></div>
            </div>

            <div className="row">
              <div className="col order-first asd">{flightDetails.scheduleDate}</div>
              <div className="col order-last asd">{flightDetails.flightNo}</div>
            </div>
            <div className="row">
              <div className="col"><br /><br /></div>
            </div>
            <div className="row">
              <div className="col-4 zxc">Terminal : {flightDetails.terminal}</div>
              <div className="col-4 zxc">Gate : {flightDetails.gate}</div>
            </div>
            <div className="row">
              <div className="col"><br /><br /></div>
            </div>
            <div className="row">
              <div className="col order-first">
                <img src={notifi} />
              </div>
              <div className="col">
                <img src={add} />
              </div>
              <div className="col order-last"onClick={() => handleDelete(flight)}>
                <img src={rem} />
              </div>
            </div>
          </div>
          <div className="card cardRight">
    <div className="row">
     <div className='col-sm-2 mini-side-headings'>Purchased:</div> 
     <div className='col-sm-10 mini-side-carousel'><Slider {...settings}> {data.map((item, index) => ( <div key={index}> <Minicard product={data[index]} width={113} height={104} /> </div> ))} </Slider>
</div>
      </div>
      <div className="row">
     <div className='col-sm-2 mini-side-headings'>In Cart:</div> 
     <div className='col-sm-10 mini-side-carousel'><Slider {...settings}> {itemList.map((item, index) => ( <div key={index}> <Minicard product={item} width={113} height={104} /> </div> ))} </Slider></div>
      </div>
      <div className="row">
     <div className='col-sm-2 mini-side-headings'>In Wishlist:</div> 
     <div className='col-sm-10 mini-side-carousel'><Slider {...settings}> {data.map((item, index) => ( <div key={index}> <Minicard product={data[index]} width={113} height={104} /> </div> ))} </Slider></div>
      </div>
    
   
  </div>
        </div>
      </div>
    </div>
  );
};
export default JurneyPlan;
