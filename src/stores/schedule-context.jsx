import { useState, createContext } from "react";
import aircraftsJson from "../json/aircrafts.json";
import flightsJson from "../json/flights.json";
import { getTomorrow } from "../features/scheduler/utils/date";

export const ScheduleContext = createContext({
  date: null,
  aircraft: [],
  flights: [],
  selectedAircraftIdent: null,
});

export const ScheduleContextProvider = ({ children }) => {
  const [date, setDate] = useState(getTomorrow());
  const [aircraft, setAircraft] = useState([]);
  const [flights, setFlights] = useState([]);
  const [selectedAircraftIdent, setSelectedAircraftIdent] = useState(null);

  const fetchAirFleet = () => {
    const result = aircraftsJson;
    setAircraft(
      result.map((a) => ({
        ...a,
        rotation: [],
      }))
    );
  };

  const fetchFlights = () => {
    const result = flightsJson;
    setFlights(
      result.map((f) => ({
        ...f,
        assignedAircraft: null,
      }))
    );
  };

  const context = {
    date,
    aircraft,
    flights,
    selectedAircraftIdent,
    fetchAirFleet,
    fetchFlights,
    setSelectedAircraftIdent,
  };

  return (
    <ScheduleContext.Provider value={context}>
      {children}
    </ScheduleContext.Provider>
  );
};
