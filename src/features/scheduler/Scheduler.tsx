import { useEffect, useState } from "react";
import { useScheduleDispatchContext } from "./stores/schedule-context";
import { fetchAirFleet, fetchFlights } from "./api";
import { Header } from "./components/header/Header";
import { AircraftList } from "./components/aircraft-list/AircraftList";
import { FlightList } from "./components/flight-list/FlightList";
import { ActionTypes } from "./stores/actions";

import styles from "./Scheduler.module.css";
import { Rotation } from "./components/rotation/Rotation";

export const Scheduler = () => {
  const dispatch = useScheduleDispatchContext();
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aircraft, flights] = await Promise.all([
          fetchAirFleet(),
          fetchFlights(),
        ]);
        dispatch({
          type: ActionTypes.SET_AIRCRAFT,
          payload: aircraft,
        });
        dispatch({
          type: ActionTypes.SET_FLIGHTS,
          payload: [
            ...flights,
            {
              // Flight that goes over midnight for testing,
              // should never be in the list of flights to choose
              ident: "AS1999",
              departuretime: 81000,
              arrivaltime: 16200,
              readable_departure: "10:30",
              readable_arrival: "04:30",
              origin: "LIPZ",
              destination: "EGCC",
            },
          ],
        });
        isLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <AircraftList />
            <Rotation />
            <FlightList />
          </>
        )}
      </div>
    </>
  );
};
