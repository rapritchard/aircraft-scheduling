import { turnaroundInSeconds, secondsPerDay } from "./date";
import type { Flight } from "../types";

export const calculateUsage = (flights: Flight[]) => {
  const totalTimeScheduled = flights.reduce(
    (acc, curr) =>
      acc + (curr.arrivaltime - curr.departuretime + turnaroundInSeconds),
    0
  );
  return (totalTimeScheduled * 100) / secondsPerDay;
};
