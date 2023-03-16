import React, { useState, useEffect } from "react";
import axios from "axios";
import "./flightpin.css";
import { FaMinusCircle } from "react-icons/fa/";

const Flightpin = () => {
  const today = new Date().toISOString().substring(0, 10);
  const [flights, setFlights] = useState(null);
  const [pinnedFlights, setPinnedFlights] = useState(() => {
    const pinnedFlightsString = localStorage.getItem("pinnedFlights");
    return pinnedFlightsString ? JSON.parse(pinnedFlightsString) : [];
  });


  useEffect(() => {
    axios
      .get("/flights.json")
      .then((response) => setFlights(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    localStorage.setItem("pinnedFlights", JSON.stringify(pinnedFlights));
  }, [pinnedFlights]);

  const handleFlightPin = (event) => {
    const flightNumber = event.target.value;
    const startDate = document.getElementById("startDate").value;
    if (pinnedFlights.length < 3 && flightNumber && startDate) {
      const pinnedFlight = { flightNumber, startDate };
      setPinnedFlights([...pinnedFlights, pinnedFlight]);
    }
  };

  const handleFlightUnpin = (flightNumber) => {
    const filteredPinnedFlights = pinnedFlights.filter(
      (pinnedFlight) => pinnedFlight.flightNumber !== flightNumber
    );
    setPinnedFlights(filteredPinnedFlights);
  };

  if (!flights) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-5">
      <div className="d-flex">
        <div className="mr-3">
          <div>
            <label htmlFor="startDate">Date</label>
          </div>
          <input
            type="date"
            id="startDate"
            name="startDate"
            min={today}
            defaultValue=" "
            required
          />
        </div>
        <div>
          <div>
            <label htmlFor="flightOption">Flight</label>
          </div>
          <select
            id="flightOption"
            name="flightOption"
            onChange={handleFlightPin}
            required
          >
            <option value="">Select Flight</option>
            {flights.map((flight, index) => (
              <option key={index} value={flight.flightNumber}>
                {flight.flightNumber}
              </option>
            ))}
          </select>
        </div>
        <p className="text-center">Pinned Flights: </p>
        <div className="d-flex">
          {pinnedFlights.map((pinnedFlight, index) => (
            <div key={index} className="d-flex align-items-center mb-3">
              <div className="mr-2">{pinnedFlight.flightNumber}</div>
              <div className="mr-2">| </div>
              <div className="mr-2">{pinnedFlight.startDate}</div>
              <label onClick={() => handleFlightUnpin(pinnedFlight.flightNumber)}><FaMinusCircle />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Flightpin;
