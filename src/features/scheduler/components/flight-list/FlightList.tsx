import { useEffect, useState } from "react";
import {
  useScheduleDispatchContext,
  useScheduleStateContext,
} from "../../stores/schedule-context";
import { Panel } from "../panel/Panel";
import { FlightCard } from "../flight-card/FlightCard";
import { ActionTypes } from "../../stores/actions";
import { secondsPerDay, turnaroundInSeconds } from "../../utils/date";
import type { Flight } from "../../types";

export const FlightList = () => {
  const dispatch = useScheduleDispatchContext();
  const { aircraft, flights, selectedAircraftIdent } =
    useScheduleStateContext();
  const [selectableFlights, setSelectableFlights] = useState<Flight[]>([]);
  const [selectedFlights, setSelectedFlights] = useState<Flight[]>([]);

  const getSelectedFlights = () => {
    const selectedAircraft = aircraft.find(
      (a) => a.ident === selectedAircraftIdent
    );
    if (selectedAircraft !== undefined) {
      setSelectedFlights(selectedAircraft.rotation);
    }
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

  const handleFlightClick = (ident: string) => {
    const flight = flights.find((f) => f.ident === ident);
    if (flight !== undefined) {
      dispatch({
        type: ActionTypes.ADD_ROTATION,
        payload: flight,
      });
    }
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
    <Panel heading="Flights">
      {selectableFlights &&
        selectableFlights.map((flight) => (
          <FlightCard
            key={flight.ident}
            destination={flight.destination}
            ident={flight.ident}
            onClick={handleFlightClick}
            origin={flight.origin}
            readableArrival={flight.readable_arrival}
            readableDeparture={flight.readable_departure}
          />
        ))}
    </Panel>
  );
};
