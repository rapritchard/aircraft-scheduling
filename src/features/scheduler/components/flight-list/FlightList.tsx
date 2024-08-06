import { useEffect, useState } from "react";
import {
  useScheduleDispatchContext,
  useScheduleStateContext,
} from "../../stores/schedule-context";
import { Panel } from "../panel/Panel";
import { FlightCard } from "../flight-card/FlightCard";
import { ActionTypes } from "../../stores/actions";
import { checkFlightFits } from "../../utils/flight-validation";
import type { Flight } from "../../types";
import { isPastMidnight } from "../../utils/date";

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
      const firstFlight = selectedFlights[0];
      let latestSelectedFlight: Flight | undefined;
      if (selectedFlights.length > 1) {
        latestSelectedFlight = selectedFlights[selectedFlights.length - 1];
      }

      validFlights = availableFlights.filter((flight) => {
        const validBeforeFirst = checkFlightFits(flight, firstFlight, "before");
        const validBeforeLast = checkFlightFits(
          flight,
          latestSelectedFlight || firstFlight,
          "after"
        );
        return validBeforeFirst || validBeforeLast;
      });
    } else {
      validFlights = availableFlights;
    }
    setSelectableFlights(
      validFlights.filter(
        (f) => !isPastMidnight(f.departuretime, f.arrivaltime)
      )
    );
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
    <Panel heading="Flights" testId="flightsList">
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
