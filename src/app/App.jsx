import { ScheduleContextProvider } from "../stores/schedule-context";
import { Scheduler } from "../features/scheduler/Scheduler";

import "./App.css";

export const App = () => (
  <ScheduleContextProvider>
    <Scheduler />
  </ScheduleContextProvider>
);
