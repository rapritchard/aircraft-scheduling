import aircraftsJson from "../../../json/aircrafts.json";
import flightsJson from "../../../json/flights.json";

export const fetchAirFleet = () => {
  const result = aircraftsJson;
  return result;
};

export const fetchFlights = () => {
  const result = flightsJson;
  return result;
};
