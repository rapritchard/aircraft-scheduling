import {
  useScheduleDispatchContext,
  useScheduleStateContext,
} from "../../stores/schedule-context";
import { AircraftCard } from "../aircraft-card/AircraftCard";
import { Panel } from "../panel/Panel";
import { ActionTypes } from "../../stores/actions";

export const AircraftList = () => {
  const dispatch = useScheduleDispatchContext();
  const { aircraft, selectedAircraftIdent } = useScheduleStateContext();
  const sortedAircraft = [...aircraft].sort((a, b) => b.utilised - a.utilised);

  const handleAircraftClick = (ident: string) => {
    dispatch({
      type: ActionTypes.SELECT_AIRCRAFT,
      payload: ident,
    });
  };

  return (
    <Panel heading="Aircraft">
      {sortedAircraft.map((craft) => (
        <AircraftCard
          key={craft.ident}
          {...{ ...craft }}
          onClick={handleAircraftClick}
          selected={selectedAircraftIdent === craft.ident}
        />
      ))}
    </Panel>
  );
};
