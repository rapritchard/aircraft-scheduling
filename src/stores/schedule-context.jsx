import { createContext, useReducer } from "react";
import {
  getTomorrow,
  turnaroundInSeconds,
  secondsPerDay,
} from "../features/scheduler/utils/date";

const initialState = {
  date: getTomorrow(),
  aircraft: [],
  flights: [],
  selectedAircraftIdent: null,
  error: null,
};

const calculateUsage = (flights) => {
  const totalTimeScheduled = flights.reduce(
    (acc, curr) =>
      acc + (curr.arrivaltime - curr.departuretime + turnaroundInSeconds),
    0
  );
  return (totalTimeScheduled * 100) / secondsPerDay;
};

const scheduleReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA": {
      const { aircraft, flights } = action.payload;
      return {
        ...state,
        aircraft: aircraft.map((a) => ({
          ...a,
          utilised: 0,
          rotation: [],
        })),
        flights: flights.map((f) => ({
          ...f,
          assignedToAircraft: false,
          aircraftIndent: null,
        })),
        selectedAircraftIdent: aircraft[0].ident,
      };
    }
    case "ADD_ROTATION": {
      const { aircraft, flights, selectedAircraftIdent } = state;
      const flight = action.payload;

      const updatedFlight = {
        ...flight,
        assignedToAircraft: true,
        aircraftIndent: selectedAircraftIdent,
      };

      const foundAircraft = aircraft.find(
        (a) => a.ident === selectedAircraftIdent
      );

      const updatedRotation = [...foundAircraft.rotation, updatedFlight];

      const updatedCraft = {
        ...foundAircraft,
        utilised: calculateUsage(updatedRotation),
        rotation: updatedRotation,
      };

      return {
        ...state,
        aircraft: aircraft.map((a) =>
          a.ident === updatedCraft.ident ? updatedCraft : a
        ),
        flights: flights.map((f) =>
          f.ident === updatedFlight.ident ? updatedFlight : f
        ),
      };
    }
    case "REMOVE_ROTATION": {
      const { aircraft, flights, selectedAircraftIdent } = state;
      const flightIdent = action.payload;

      const foundAircraft = aircraft.find(
        (a) => a.ident === selectedAircraftIdent
      );

      const updatedRotation = foundAircraft.rotation.filter(
        (r) => r.ident !== flightIdent
      );

      const updatedCraft = {
        ...foundAircraft,
        utilised: calculateUsage(updatedRotation),
        rotation: updatedRotation,
      };

      return {
        ...state,
        aircraft: aircraft.map((a) =>
          a.ident === updatedCraft.ident ? updatedCraft : a
        ),
        flights: flights.map((flight) =>
          flight.ident === flightIdent
            ? {
                ...flight,
                assignedToAircraft: false,
                aircraftIndent: null,
              }
            : flight
        ),
      };
    }
    case "SELECT_AIRCRAFT": {
      return {
        ...state,
        selectedAircraftIdent: action.payload,
      };
    }
    default:
      return state;
  }
};

export const ScheduleContext = createContext();

export const ScheduleContextProvider = ({ children }) => {
  const [schedule, scheduleDispatch] = useReducer(
    scheduleReducer,
    initialState
  );

  return (
    <ScheduleContext.Provider value={{ schedule, scheduleDispatch }}>
      {children}
    </ScheduleContext.Provider>
  );
};
