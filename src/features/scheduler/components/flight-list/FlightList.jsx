import { useContext, useEffect, useState } from "react";
import { ScheduleContext } from "../../../../stores/schedule-context";
import { secondsPerDay, turnaroundInSeconds } from "../../utils/date";
import { Flight } from "../flight/Flight";

import styles from "../styles/Panel.module.css";

export const FlightList = () => {
  const [selectableFlights, setSelectableFlights] = useState();
  const [selectedFlights, setSelectedFlights] = useState();
  const { schedule, scheduleDispatch } = useContext(ScheduleContext);
  const getSelectedFlights = () => {
    const selectedAircraft = schedule.aircraft.find(
      (a) => a.ident === schedule.selectedAircraftIdent
    );
    setSelectedFlights(selectedAircraft.rotation);
  };

  const getAvailableFlights = () => {
    const flights = [...schedule.flights];

    flights.sort((a, b) => a.departuretime - b.departuretime);
    const availableFlights = flights.filter(
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
    const flight = schedule.flights.find((f) => f.ident === ident);
    scheduleDispatch({
      type: "ADD_ROTATION",
      payload: flight,
    });
  };

  useEffect(() => {
    if (schedule.aircraft.length) {
      getSelectedFlights();
    }
  }, [schedule.aircraft, schedule.selectedAircraftIdent]);

  useEffect(() => {
    if (selectedFlights) {
      getAvailableFlights();
    }
  }, [selectedFlights]);

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeading}>
        <h2>Flights</h2>
      </div>
      <div className={styles.panelContainer}>
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
