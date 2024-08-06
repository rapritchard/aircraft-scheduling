import { useEffect, useState } from "react";
import {
  useScheduleDispatchContext,
  useScheduleStateContext,
} from "../../stores/schedule-context";
import { FlightCard } from "../flight-card/FlightCard";
import { Timeline } from "../timeline/Timeline";
import { ActionTypes } from "../../stores/actions";
import type { Flight, Aircraft } from "../../types";

import styles from "./Rotation.module.css";

export const Rotation = () => {
  const dispatch = useScheduleDispatchContext();
  const { aircraft, selectedAircraftIdent } = useScheduleStateContext();
  const [currentAircraft, setCurrentAircraft] = useState<Aircraft>();
  const [rotation, setRotation] = useState<Flight[]>([]);

  const getSelectedFlights = () => {
    const selectedAircraft = aircraft.find(
      (a) => a.ident === selectedAircraftIdent
    );
    if (selectedAircraft !== undefined) {
      setCurrentAircraft(selectedAircraft);
      setRotation(selectedAircraft.rotation);
    }
  };

  useEffect(() => {
    if (aircraft.length) {
      getSelectedFlights();
    }
  }, [aircraft, selectedAircraftIdent]);

  const handleFlightClick = (ident: string) => {
    dispatch({
      type: ActionTypes.REMOVE_ROTATION,
      payload: ident,
    });
  };

  if (!currentAircraft) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2>{`Rotation ${currentAircraft.ident}`}</h2>
      </div>
      <div className={styles.list} data-testid="rotationList">
        {rotation.map((flight) => (
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
      </div>
      <Timeline flights={rotation} />
    </div>
  );
};
