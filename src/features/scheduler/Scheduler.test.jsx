import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";

import { Scheduler } from "./Scheduler";
import { ScheduleProvider } from "./stores/schedule-context";
import { aircraft, flights } from "../../../testSetup";

const renderComponent = () => {
  const user = userEvent.setup();

  const component = (
    <ScheduleProvider>
      <Scheduler />
    </ScheduleProvider>
  );

  return { user, ...render(component) };
};

const waitForLoading = () =>
  waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

describe("<Scheduler />", () => {
  test("Renders default state", async () => {
    renderComponent();
    await waitForLoading();

    const elements = [
      screen.getByText("Aircraft"),
      screen.getByText("Flights"),
    ];

    elements.forEach((element) => expect(element).toBeInTheDocument());

    const aircraftElements = within(
      screen.getByTestId("aircraftList")
    ).getAllByRole("button");
    const flightElements = within(
      screen.getByTestId("flightsList")
    ).getAllByRole("button");
    const rotationElements = within(
      screen.getByTestId("rotationList")
    ).queryAllByRole("button");

    expect(aircraftElements.length).toBe(aircraft.length);
    expect(flightElements.length).toBe(flights.length);
    expect(rotationElements.length).toBe(0);

    const currentRotationTitle = screen.getByText(
      `Rotation ${aircraft[0].ident}`
    );
    expect(currentRotationTitle).toBeInTheDocument();
  });

  test("Clicking an aircraft should set it to the current rotation to be edited", async () => {
    const { user } = renderComponent();
    await waitForLoading();

    const firstAircraft = `Rotation ${aircraft[0].ident}`;
    const firstRotationTitle = screen.getByText(firstAircraft);

    expect(firstRotationTitle).toBeInTheDocument();

    const secondAircraft = within(
      screen.getByTestId("aircraftList")
    ).getAllByRole("button")[1];

    await user.click(secondAircraft);
    expect(screen.queryByText(firstAircraft)).toBeNull();

    const newRotationTitle = screen.getByText(`Rotation ${aircraft[1].ident}`);
    expect(newRotationTitle).toBeInTheDocument();
  });

  test("Clicking on a flight should add it to the current aircraft rotation", async () => {
    const { user } = renderComponent();
    await waitForLoading();

    const flight = "AS1001 LFSB 06:00 LFMN 07:15";
    const flightsList = within(screen.getByTestId("flightsList"));

    const flightElement = flightsList.getByRole("button", { name: flight });

    await user.click(flightElement);

    expect(
      flightsList.queryByRole("button", {
        name: flight,
      })
    ).not.toBeInTheDocument();

    const rotationFlightElement = within(
      screen.getByTestId("rotationList")
    ).queryByRole("button", { name: flight });

    expect(rotationFlightElement).toBeInTheDocument();
  });

  test("Clicking on a flight should update flight list to show only valid flights", async () => {
    const { user } = renderComponent();
    await waitForLoading();

    const flightOne = "AS1001 LFSB 06:00 LFMN 07:15";
    const validSecondFlight = "AS1002 LFMN 07:45 LFSB 08:55";

    const flightsList = within(screen.getByTestId("flightsList"));

    const flightElement = flightsList.getByRole("button", {
      name: "AS1001 LFSB 06:00 LFMN 07:15",
    });

    await user.click(flightElement);

    within(screen.getByTestId("flightsList")).queryByRole("button", {
      name: flightOne,
    });

    expect(flightsList.queryAllByRole("button").length).toBe(1);
    const validSecondFlightElement = flightsList.getByRole("button", {
      name: validSecondFlight,
    });
    expect(validSecondFlightElement).toBeInTheDocument();
  });

  test("Clicking on a flight in rotation list should remove it and add it back to the flight list", async () => {
    const { user } = renderComponent();
    await waitForLoading();

    const flight = "AS1001 LFSB 06:00 LFMN 07:15";
    const flightsList = within(screen.getByTestId("flightsList"));
    const rotationList = within(screen.getByTestId("rotationList"));

    await user.click(flightsList.getByRole("button", { name: flight }));
    expect(
      flightsList.queryByRole("button", {
        name: flight,
      })
    ).not.toBeInTheDocument();

    const rotationFlightElement = rotationList.queryByRole("button", {
      name: flight,
    });

    expect(rotationFlightElement).toBeInTheDocument();
    await user.click(rotationFlightElement);

    expect(rotationList.queryAllByRole("button").length).toBe(0);
    expect(
      flightsList.getByRole("button", { name: flight })
    ).toBeInTheDocument();
  });

  test("A flight assigned to an aircraft should not appear for other aircraft", async () => {
    const { user } = renderComponent();
    await waitForLoading();

    const flight = "AS1001 LFSB 06:00 LFMN 07:15";
    const flightsList = within(screen.getByTestId("flightsList"));

    await user.click(flightsList.getByRole("button", { name: flight }));

    const secondAircraft = within(
      screen.getByTestId("aircraftList")
    ).getAllByRole("button")[1];

    await user.click(secondAircraft);
    expect(
      flightsList.queryByRole("button", {
        name: flight,
      })
    ).not.toBeInTheDocument();
  });
});
