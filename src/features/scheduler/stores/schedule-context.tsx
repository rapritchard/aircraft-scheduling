import { createContext, useReducer, useContext, ReactNode } from "react";
import { scheduleReducer, initialState } from "./schedule-reducer";
import type { ScheduleState } from "../types";
import type { Actions } from "./actions";

type ScheduleStateContext = ScheduleState;
type ScheduleDispatchContext = React.Dispatch<Actions>;

const ScheduleStateContext = createContext<ScheduleStateContext | null>(null);
const ScheduleDispatchContext = createContext<ScheduleDispatchContext | null>(
  null
);

export const useScheduleStateContext = () => {
  const context = useContext(ScheduleStateContext);
  if (!context) {
    throw new Error(
      "useScheduleStateContext must be used within a ScheduleStateContext.Provider"
    );
  }
  return context;
};

export const useScheduleDispatchContext = () => {
  const context = useContext(ScheduleDispatchContext);
  if (!context) {
    throw new Error(
      "useScheduleStateContext must be used within a ScheduleDispatchContext.Provider"
    );
  }
  return context;
};

interface ScheduleProviderProps {
  children: ReactNode;
}

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const [schedule, scheduleDispatch] = useReducer(
    scheduleReducer,
    initialState
  );

  return (
    <ScheduleStateContext.Provider value={schedule}>
      <ScheduleDispatchContext.Provider value={scheduleDispatch}>
        {children}
      </ScheduleDispatchContext.Provider>
    </ScheduleStateContext.Provider>
  );
};
