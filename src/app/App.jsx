import { ScheduleContextProvider } from "../stores/schedule-context";
import { Scheduler } from "../features/scheduler/Scheduler";

export const App = () => (
  <ScheduleContextProvider>
    <Scheduler />
  </ScheduleContextProvider>
);
