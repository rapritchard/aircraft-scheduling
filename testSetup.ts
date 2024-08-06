import { afterAll, afterEach, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";

import aircraftJson from "./src/json/aircrafts.json";
import flightsJson from "./src/json/flights.json";

export const aircraft = aircraftJson.slice(0, 3);
export const flights = flightsJson.slice(0, 15);

export const restHandlers = [
  http.get("https://recruiting-assessment.alphasights.com/api/aircrafts", () =>
    HttpResponse.json(aircraft)
  ),
  http.get("https://recruiting-assessment.alphasights.com/api/flights", () =>
    HttpResponse.json(flights)
  ),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterAll(() => server.close());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});
