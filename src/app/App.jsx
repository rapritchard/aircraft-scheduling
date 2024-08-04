import { ScheduleProvider } from "../features/scheduler/stores/schedule-context";
import { Scheduler } from "../features/scheduler/Scheduler";

import "./App.css";

export const App = () => (
  <ScheduleProvider>
    <Scheduler />
  </ScheduleProvider>
);
