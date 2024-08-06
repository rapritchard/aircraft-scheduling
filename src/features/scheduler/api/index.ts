import type { AircraftResponse, FlightResponse } from "../types";

export const fetchAirFleet = async (): Promise<AircraftResponse[]> => {
  const response = await fetch(
    "https://recruiting-assessment.alphasights.com/api/aircrafts"
  );
  const data = await response.json();
  return data;
};

export const fetchFlights = async (): Promise<FlightResponse[]> => {
  const response = await fetch(
    "https://recruiting-assessment.alphasights.com/api/flights"
  );
  const data = await response.json();
  return data;
};
