import { turnaroundInSeconds } from "./date";
import type { Flight } from "../types";

export const checkFlightFits = (
  flightToFit: Flight,
  selectedFlight: Flight,
  where: "before" | "after"
) => {
  let isValid = false;

  if (
    where === "before" &&
    flightToFit.destination === selectedFlight.origin &&
    flightToFit.arrivaltime + turnaroundInSeconds < selectedFlight.departuretime
  ) {
    isValid = true;
  }

  if (
    where === "after" &&
    flightToFit.origin === selectedFlight.destination &&
    flightToFit.departuretime > selectedFlight.arrivaltime + turnaroundInSeconds
  ) {
    isValid = true;
  }
  return isValid;
};

export const getRotationsToRemove = (
  activeIndex: number,
  rotation: Flight[]
) => {
  // First or last item in the rotation
  // can safely be removed without causing conflicts
  if (activeIndex === 0 || activeIndex === rotation.length - 1) {
    return [activeIndex];
  }
  const indexesToRemove = [activeIndex];

  const flightsToCheck = [...rotation];
  let previousFlight: Flight;

  flightsToCheck.forEach((currentFlight, index) => {
    if (!previousFlight) {
      previousFlight = currentFlight;
    } else if (index !== activeIndex && index <= flightsToCheck.length - 1) {
      if (previousFlight.destination !== currentFlight.origin) {
        indexesToRemove.push(index);
      } else {
        previousFlight = currentFlight;
      }
    }
  });
  return indexesToRemove;
};
