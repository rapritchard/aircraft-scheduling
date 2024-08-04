import { useContext, useEffect, useState } from "react";
import { ScheduleContext } from "../../../../stores/schedule-context";

import styles from "./Rotation.module.css";
import { Flight } from "../flight/Flight";
import { Timeline } from "../timeline/Timeline";

export const Rotation = () => {
  const { schedule, scheduleDispatch } = useContext(ScheduleContext);
  const [aircraft, setAircraft] = useState();
  const [rotation, setRotation] = useState();

  const getSelectedFlights = () => {
    const selectedAircraft = schedule.aircraft.find(
      (a) => a.ident === schedule.selectedAircraftIdent
    );
    setAircraft(selectedAircraft);
    setRotation(selectedAircraft.rotation);
  };

  useEffect(() => {
    if (schedule.aircraft.length) {
      getSelectedFlights();
    }
  }, [schedule.aircraft, schedule.selectedAircraftIdent]);

  const handleFlightClick = (ident) => {
    scheduleDispatch({
      type: "REMOVE_ROTATION",
      payload: ident,
    });
  };

  if (!aircraft) {
    return null;
  }

  return (
    <div className={styles.rotation}>
      <div className={styles.rotationHeading}>
        <h2>{`Rotation ${aircraft.ident}`}</h2>
      </div>
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
      <Timeline flights={rotation} />
    </div>
  );
};
