import { useEffect, useState } from "react";
import {
  SCHEDULE_ACTION_TYPES,
  useScheduleDispatchContext,
  useScheduleStateContext,
} from "../../stores/schedule-context";

import styles from "./Rotation.module.css";
import { Flight } from "../flight/Flight";
import { Timeline } from "../timeline/Timeline";

export const Rotation = () => {
  const dispatch = useScheduleDispatchContext();
  const { aircraft, selectedAircraftIdent } = useScheduleStateContext();
  const [currentAircraft, setCurrentAircraft] = useState();
  const [rotation, setRotation] = useState();

  const getSelectedFlights = () => {
    const selectedAircraft = aircraft.find(
      (a) => a.ident === selectedAircraftIdent
    );
    setCurrentAircraft(selectedAircraft);
    setRotation(selectedAircraft.rotation);
  };

  useEffect(() => {
    if (aircraft.length) {
      getSelectedFlights();
    }
  }, [aircraft, selectedAircraftIdent]);

  const handleFlightClick = (ident) => {
    dispatch({
      type: SCHEDULE_ACTION_TYPES.REMOVE_ROTATION,
      payload: ident,
    });
  };

  if (!currentAircraft) {
    return null;
  }

  return (
    <div className={styles.rotation}>
      <div className={styles.rotationHeading}>
        <h2>{`Rotation ${currentAircraft.ident}`}</h2>
      </div>
      <div className={styles.rotationList} data-testid="rotationList">
        {rotation.map((flight) => (
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
      <Timeline flights={rotation} />
    </div>
  );
};
