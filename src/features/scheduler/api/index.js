export const fetchAirFleet = async () => {
  const response = await fetch(
    "https://recruiting-assessment.alphasights.com/api/aircrafts"
  );
  const data = await response.json();
  return data;
};

export const fetchFlights = async () => {
  const response = await fetch(
    "https://recruiting-assessment.alphasights.com/api/flights"
  );
  const data = await response.json();
  return data;
};
