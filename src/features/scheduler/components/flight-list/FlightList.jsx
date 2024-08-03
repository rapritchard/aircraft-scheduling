import { useContext, useEffect, useState } from "react";
import { ScheduleContext } from "../../../../stores/schedule-context";
import { turnaroundInSeconds } from "../../utils/date";
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

  const checkFlightValidity = (flightToCheck, selectedFlight) => {
    const isRoundTrip =
      selectedFlight.origin === flightToCheck.destination &&
      selectedFlight.destination === flightToCheck.origin;
    const arrivesBeforeSelectedDeparture =
      flightToCheck.arrivaltime + turnaroundInSeconds <
      selectedFlight.departuretime;
    const departsAfterSelectedArrival =
      selectedFlight.arrivaltime + turnaroundInSeconds <
      flightToCheck.departuretime;

    // If flight is a round trip, confirm that either:
    // 1. The flight we're checking arrives before the previous selected flight departs
    // with turnaroundInSeconds accounted for
    // 2. Previous selected flight arrives before next flight departure with turnaroundInSeconds accounted for
    if (isRoundTrip) {
      return arrivesBeforeSelectedDeparture || departsAfterSelectedArrival;
    }

    if (selectedFlight.origin === flightToCheck.destination) {
      return arrivesBeforeSelectedDeparture;
    }
    if (selectedFlight.destination === flightToCheck.origin) {
      return departsAfterSelectedArrival;
    }
    return false;
  };

  const getAvailableFlights = () => {
    const flights = [...schedule.flights];

    flights.sort((a, b) => a.departuretime - b.departuretime);
    const availableFlights = flights.filter(
      (flight) => !flight.assignedToAircraft
    );

    let validFlights = [];

    if (selectedFlights.length) {
      availableFlights.forEach((avaFlight) => {
        if (avaFlight.assignedToAircraft) {
          return;
        }

        selectedFlights.forEach((selFlight, index) => {
          let isAvailable = checkFlightValidity(avaFlight, selFlight);

          if (isAvailable && index > 0) {
            isAvailable = checkFlightValidity(
              avaFlight,
              selectedFlights[index - 1]
            );
          }

          if (isAvailable && index < selectedFlights.length - 1) {
            isAvailable = checkFlightValidity(
              avaFlight,
              selectedFlights[index + 1]
            );
          }

          if (isAvailable) {
            validFlights.push(avaFlight);
          }
        });
      });
    } else {
      validFlights = availableFlights;
    }
    setSelectableFlights(
      validFlights.filter((flight) => flight.arrivaltime > flight.departuretime)
    );
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
              handleFlightClick={handleFlightClick}
              ident={flight.ident}
              origin={flight.origin}
              readableArrival={flight.readable_arrival}
              readableDeparture={flight.readable_departure}
            />
          ))}
      </div>
    </div>
  );
};
