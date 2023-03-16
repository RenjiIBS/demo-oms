import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import JurneyPlan from './jurneydetails';

const JurnyPlanPage = () => {
  let optionType = useSelector(state => state.common.option);
  if (optionType == 'pickup'){
    optionType = 'flight'
  }
  const selectedFlights = useSelector((state) => state.flight.flightList.filter(item => item.selected));
  if (optionType == 'inspiration') return <>Coming soon ....</>
  return (
    <div>
      {
        selectedFlights.map(item => (
          <JurneyPlan optionType={optionType} flight={item} />
        ))
      }
    </div>
  )
}

export default JurnyPlanPage