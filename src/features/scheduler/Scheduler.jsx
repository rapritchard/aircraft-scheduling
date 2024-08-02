import { useContext, useEffect } from "react";
import { ScheduleContext } from "../../stores/schedule-context";

export const Scheduler = () => {
  const { fetchAirFleet, fetchFlights } = useContext(ScheduleContext);

  useEffect(() => {
    fetchAirFleet();
    fetchFlights();
  }, []);

  return <div></div>;
};
