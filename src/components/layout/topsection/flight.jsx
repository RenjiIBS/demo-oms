import { Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import './styles.css'
import flight from '../images/fight.svg'
import insp from '../images/inspire.svg'
import cabf from '../images/cabflight.svg'
import Popup from '../../popup/popup'
import options from './data.js'
import inspOptions from './insp_data.js'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux'
import { addFlight, deleteFlight, selectPinFlights, unSelectPinFlights } from '../../../redux/features/pingFlight/pingflightSlice'
import { addInspiration, deleteInspiration, selectInspiration, unSelectInspiration } from '../../../redux/features/pinInspiration/pinInspirationSlice'
import {useLocation} from 'react-router-dom';
import { locationActions } from '../../../redux/features/pinInspiration/locationListSlice';
import { flightActions } from '../../../redux/features/pingFlight/flightListSlice';
import {cartError} from '../../../redux/features/cart/cartslice';
import {selectServices} from '../../../redux/features/common/commonSlice';

const Flight = ({locations, flights, fetchLocations, fetchFlights}) => {
    let location = useLocation();

    // const [option, handleSelectOption] = useState('flight');
    const [flightDate, setFlightDate] = useState('');
    const [inspirationDate, setInspirationDate] = useState('');
    const [flightData, setFlightData] = useState([]);
    const [locationData, setLocationData] = useState([]);
    const [data, setData] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState({});
    const[showAlert, setShowAlert] =useState(false);
    const dispatch = useDispatch()

    const [basicSelected, setBasicSelected] = useState([]);
    const [selected, setSelected] = useState([]);
    const { flightList, error } = useSelector((state) => state.flight)
    const { inspirationList, err } = useSelector((state) => state.inspiration)
    const cart  = useSelector((state) => state.cart)
    const option = useSelector(state => state.common.option)
    const flightDataRed = useSelector(state => state.flights.flights)
    const isLoading =  useSelector(state => state.flights.loading)
    useEffect(() => {
        setFlightData(flightDataRed);
    }, [flightDataRed])

    const handleAddFlight = (e) => {
        console.log(e, "selected", selected)
        let data = { "flightNo": e[0].flightNo, "time": e[0].scheduleTime, date: e[0].scheduleDate,"source": e[0].source,"destination": e[0].destination,"terminal": e[0].terminal,"gate": e[0].gate }
        setShowAlert(true)
        dispatch(addFlight(data));
        dispatch(cartError())
    }

    
    
    const handleAddInspration = (e) => {
        console.log(e, "selected", selected)
        let locList = e[0].split(", ")
		let data = { "location": locList[0], date: inspirationDate }
        dispatch(addInspiration(data));
        dispatch(cartError())
    }
    
    const handleFetchLocationByDate = (date) => {
        dispatch(locationActions.fetchLocations(date));
        setLocationData(locations);
      }
    const  handleFetchFlightByDate = (date) => {
        dispatch(flightActions.fetchFlights(date))
      }
    const handleDelete = (id) => {
        console.log("Selecetd flight =>", id)
        let data = { "id": id }
        dispatch(deleteFlight(data));
    }

    const handleInspirationDelete = (id) => {
        console.log("Selected location =>", id)
        let data = { "id": id }
        dispatch(deleteInspiration(data));
    }

    const handleSelectFlight = (item) => {
        if (!item.selected) {
            dispatch(selectPinFlights({id: item.id}))
        }else {
            dispatch(unSelectPinFlights({id: item.id}))
        }
        
    }

    const handleSelectInspiration = (item) => {
        if (!item.selected) {
            dispatch(selectInspiration({id: item.id}))
        } else {
            dispatch(unSelectInspiration({id: item.id}))
        }
        
    }
    const handleFlightSearch = (input) => {
        if (input !== '') {
            setFlightData(flights.filter((flight) => {
                return flight.flightNo.search(`/${input}/`)
                    || flight.destination.search(`/${input}/`)
                    || flight.source.search(`/${input}/`);
            })
            );
        } else {
            setFlightData([]);
        }
    }

    const handleLocationSearch = (input) => {
        if (input !== '') {
            setLocationData(locations.filter((location) => {
                return location.search(`/${input}/`);
            })
            );
        } else {
            setLocationData([]);
        }
    }

    const getSelectedClass = (selected) => selected ?"selected-pinned-flight":"";

    const handleSelectOption = (str) => {
        // somethig
        dispatch(selectServices({option:str}))
    }

    return (
        <>
            


        </>

    );
}

const mapStateToProps = (state) => {
    return {
      locations: state.locations.locations,
      flights: state.flights.flights,
    };
  };
  
export default connect(mapStateToProps)(Flight);