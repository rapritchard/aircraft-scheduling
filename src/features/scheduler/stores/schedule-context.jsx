import { createContext, useReducer, useContext } from "react";
import { getTomorrow, turnaroundInSeconds, secondsPerDay } from "../utils/date";

const initialState = {
  date: getTomorrow(),
  aircraft: [],
  flights: [],
  selectedAircraftIdent: null,
  error: null,
};

export const SCHEDULE_ACTION_TYPES = {
  SET_AIRCRAFT: "SET_AIRCRAFT",
  SET_FLIGHTS: "SET_FLIGHTS",
  ADD_ROTATION: "ADD_ROTATION",
  REMOVE_ROTATION: "REMOVE_ROTATION",
  SELECT_AIRCRAFT: "SELECT_AIRCRAFT",
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
    case SCHEDULE_ACTION_TYPES.SET_AIRCRAFT: {
      const aircraft = action.payload;
      return {
        ...state,
        aircraft: aircraft.map((a) => ({
          ...a,
          utilised: 0,
          rotation: [],
        })),
        selectedAircraftIdent: aircraft[0].ident,
      };
    }
    case SCHEDULE_ACTION_TYPES.SET_FLIGHTS: {
      const flights = action.payload;
      return {
        ...state,
        flights: flights.map((f) => ({
          ...f,
          assignedToAircraft: false,
          aircraftIndent: null,
        })),
      };
    }
    case SCHEDULE_ACTION_TYPES.ADD_ROTATION: {
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
    case SCHEDULE_ACTION_TYPES.REMOVE_ROTATION: {
      const { aircraft, flights, selectedAircraftIdent } = state;
      const flightIdentToRemove = action.payload;

      const foundAircraft = aircraft.find(
        (a) => a.ident === selectedAircraftIdent
      );
      const rotationToRemoveIndex = foundAircraft.rotation.findIndex(
        (flight) => flight.ident === flightIdentToRemove
      );

      const rotations = [...foundAircraft.rotation];

      const updatedRotations = rotations.slice(0, rotationToRemoveIndex);
      const flightsToUpdate = rotations.slice(rotationToRemoveIndex);

      const updatedFlights = flightsToUpdate.map((flight) => ({
        ...flight,
        assignedToAircraft: false,
        aircraftIndent: null,
      }));

      const updatedCraft = {
        ...foundAircraft,
        utilised: calculateUsage(updatedRotations),
        rotation: updatedRotations,
      };

      return {
        ...state,
        aircraft: aircraft.map((a) =>
          a.ident === updatedCraft.ident ? updatedCraft : a
        ),
        flights: [...flights, ...updatedFlights],
      };
    }
    case SCHEDULE_ACTION_TYPES.SELECT_AIRCRAFT: {
      return {
        ...state,
        selectedAircraftIdent: action.payload,
      };
    }
    default:
      return state;
  }
};

const ScheduleStateContext = createContext();
const ScheduleDispatchContext = createContext();

export const useScheduleStateContext = () => {
  const context = useContext(ScheduleStateContext);
  if (context === undefined) {
    throw new Error(
      "useScheduleStateContext must be used within a ScheduleStateContext.Provider"
    );
  }
  return context;
};

export const useScheduleDispatchContext = () => {
  const context = useContext(ScheduleDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useScheduleStateContext must be used within a ScheduleDispatchContext.Provider"
    );
  }
  return context;
};

export const ScheduleProvider = ({ children }) => {
  const [schedule, scheduleDispatch] = useReducer(
    scheduleReducer,
    initialState
  );

  return (
    <ScheduleStateContext.Provider value={schedule}>
      <ScheduleDispatchContext.Provider value={scheduleDispatch}>
        {children}
      </ScheduleDispatchContext.Provider>
    </ScheduleStateContext.Provider>
  );
};
