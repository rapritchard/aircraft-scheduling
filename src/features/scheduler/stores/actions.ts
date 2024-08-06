import { Flight, AircraftResponse, FlightResponse } from "../types";

export enum ActionTypes {
  SET_AIRCRAFT = "SET_AIRCRAFT",
  SET_FLIGHTS = "SET_FLIGHTS",
  ADD_ROTATION = "ADD_ROTATION",
  REMOVE_ROTATION = "REMOVE_ROTATION",
  SELECT_AIRCRAFT = "SELECT_AIRCRAFT",
}

export interface SetAircraftAction {
  type: ActionTypes.SET_AIRCRAFT;
  payload: AircraftResponse[];
}

export interface SetFlightsAction {
  type: ActionTypes.SET_FLIGHTS;
  payload: FlightResponse[];
}

export interface AddRotationAction {
  type: ActionTypes.ADD_ROTATION;
  payload: Flight;
}

export interface RemoveRotationAction {
  type: ActionTypes.REMOVE_ROTATION;
  payload: string;
}

export interface SelectAircraftAction {
  type: ActionTypes.SELECT_AIRCRAFT;
  payload: string;
}

export type Actions =
  | SetAircraftAction
  | SetFlightsAction
  | AddRotationAction
  | RemoveRotationAction
  | SelectAircraftAction;
