import { useEffect, useState } from "react";
import {
  SCHEDULE_ACTION_TYPES,
  useScheduleDispatchContext,
  useScheduleStateContext,
} from "../../stores/schedule-context";
import { secondsPerDay, turnaroundInSeconds } from "../../utils/date";
import { Flight } from "../flight/Flight";

import styles from "../styles/Panel.module.css";

export const FlightList = () => {
  const dispatch = useScheduleDispatchContext();
  const { aircraft, flights, selectedAircraftIdent } =
    useScheduleStateContext();
  const [selectableFlights, setSelectableFlights] = useState();
  const [selectedFlights, setSelectedFlights] = useState();

  const getSelectedFlights = () => {
    const selectedAircraft = aircraft.find(
      (a) => a.ident === selectedAircraftIdent
    );
    setSelectedFlights(selectedAircraft.rotation);
  };

  const getAvailableFlights = () => {
    const flightsCopy = [...flights];

    flightsCopy.sort((a, b) => a.departuretime - b.departuretime);
    const availableFlights = flightsCopy.filter(
      (flight) => !flight.assignedToAircraft
    );

    let validFlights = [];

    if (selectedFlights.length) {
      const latestSelectedFlight = selectedFlights[selectedFlights.length - 1];
      validFlights = availableFlights.filter((flight) => {
        const airportMatch = flight.origin === latestSelectedFlight.destination;
        const validDeparture =
          flight.departuretime >=
            latestSelectedFlight.arrivaltime + turnaroundInSeconds &&
          flight.arrivaltime < secondsPerDay;
        return airportMatch && validDeparture;
      });
    } else {
      validFlights = availableFlights;
    }
    setSelectableFlights(validFlights);
  };

  const handleFlightClick = (ident) => {
    const flight = flights.find((f) => f.ident === ident);
    dispatch({
      type: SCHEDULE_ACTION_TYPES.ADD_ROTATION,
      payload: flight,
    });
  };

  useEffect(() => {
    if (aircraft.length) {
      getSelectedFlights();
    }
  }, [aircraft, selectedAircraftIdent]);

  useEffect(() => {
    if (selectedFlights) {
      getAvailableFlights();
    }
  }, [selectedFlights]);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2>Flights</h2>
      </div>
      <div className={styles.list} data-testid="flightsList">
        {selectableFlights &&
          selectableFlights.map((flight) => (
            <Flight
              key={flight.ident}
              destination={flight.destination}
              ident={flight.ident}
              onClick={handleFlightClick}
              origin={flight.origin}
              readableArrival={flight.readable_arrival}
              readableDeparture={flight.readable_departure}
            />
          ))}
      </div>
    </div>
  );
};
