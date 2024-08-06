import { getTomorrow, turnaroundInSeconds, secondsPerDay } from "../utils/date";
import type { Flight, ScheduleState } from "../types";
import { ActionTypes, Actions } from "./actions";

export const initialState: ScheduleState = {
  date: getTomorrow(),
  aircraft: [],
  flights: [],
  selectedAircraftIdent: null,
  error: null,
};

const calculateUsage = (flights: Flight[]) => {
  const totalTimeScheduled = flights.reduce(
    (acc, curr) =>
      acc + (curr.arrivaltime - curr.departuretime + turnaroundInSeconds),
    0
  );
  return (totalTimeScheduled * 100) / secondsPerDay;
};

export const scheduleReducer = (
  state: ScheduleState,
  action: Actions
): ScheduleState => {
  switch (action.type) {
    case ActionTypes.SET_AIRCRAFT: {
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
    case ActionTypes.SET_FLIGHTS: {
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
    case ActionTypes.ADD_ROTATION: {
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

      if (foundAircraft === undefined) {
        return { ...state, error: "Aircraft not found" };
      }

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
    case ActionTypes.REMOVE_ROTATION: {
      const { aircraft, flights, selectedAircraftIdent } = state;
      const flightIdentToRemove = action.payload;

      const foundAircraft = aircraft.find(
        (a) => a.ident === selectedAircraftIdent
      );

      if (foundAircraft === undefined) {
        return { ...state, error: "Aircraft not found" };
      }

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
    case ActionTypes.SELECT_AIRCRAFT: {
      return {
        ...state,
        selectedAircraftIdent: action.payload,
      };
    }
    default:
      return state;
  }
};
