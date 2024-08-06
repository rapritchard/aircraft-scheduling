import { getTomorrow } from "../utils/date";
import { calculateUsage } from "../utils/calculate-usage";
import { ActionTypes } from "./actions";
import { getRotationsToRemove } from "../utils/flight-validation";
import type { Actions } from "./actions";
import type { ScheduleState } from "../types";

export const initialState: ScheduleState = {
  date: getTomorrow(),
  aircraft: [],
  flights: [
    {
      ident: "MIDNIGHT_DEPARTURE",
      departuretime: 81000,
      arrivaltime: 16200,
      readable_departure: "24:00",
      readable_arrival: "07:05",
      origin: "LIPZ",
      destination: "EGCC",
      assignedToAircraft: false,
      aircraftIndent: null,
    },
  ],
  selectedAircraftIdent: null,
  error: null,
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

      const updatedRotation = [...foundAircraft.rotation, updatedFlight].sort(
        (a, b) => a.departuretime - b.departuretime
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
      const rotation = [...foundAircraft.rotation];
      const rotationIndexesToRemove = getRotationsToRemove(
        rotationToRemoveIndex,
        rotation
      );

      const updatedRotations = rotation.filter(
        (_, index) => !rotationIndexesToRemove.includes(index)
      );

      const flightsToUpdate = rotation.filter((_, index) =>
        rotationIndexesToRemove.includes(index)
      );

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
