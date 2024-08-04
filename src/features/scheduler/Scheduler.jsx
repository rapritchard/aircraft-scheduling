import { useContext, useEffect, useState } from "react";
import { ScheduleContext } from "../../stores/schedule-context";
import { fetchAirFleet, fetchFlights } from "./api";
import { Header } from "./components/header/Header";
import { AircraftList } from "./components/aircraft-list/AircraftList";
import { FlightList } from "./components/flight-list/FlightList";

import styles from "./Scheduler.module.css";
import { Rotation } from "./components/rotation/Rotation";

export const Scheduler = () => {
  const { scheduleDispatch } = useContext(ScheduleContext);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aircraft, flights] = await Promise.all([
          fetchAirFleet(),
          fetchFlights(),
        ]);
        scheduleDispatch({
          type: "SET_DATA",
          payload: {
            aircraft,
            flights,
          },
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
