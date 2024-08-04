import {
  SCHEDULE_ACTION_TYPES,
  useScheduleDispatchContext,
  useScheduleStateContext,
} from "../../stores/schedule-context";
import { Aircraft } from "../aircraft/Aircraft";
import styles from "../styles/Panel.module.css";

export const AircraftList = () => {
  const dispatch = useScheduleDispatchContext();
  const { aircraft, selectedAircraftIdent } = useScheduleStateContext();
  const sortedAircraft = [...aircraft].sort((a, b) => b.utilised - a.utilised);

  const handleAircraftClick = (ident) => {
    dispatch({
      type: SCHEDULE_ACTION_TYPES.SELECT_AIRCRAFT,
      payload: ident,
    });
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeading}>
        <h2>Aircraft</h2>
      </div>
      <div className={styles.panelContainer} data-testid="aircraftList">
        {sortedAircraft.map((craft) => (
          <Aircraft
            key={craft.ident}
            {...{ ...craft }}
            onClick={handleAircraftClick}
            selected={selectedAircraftIdent === craft.ident}
          />
        ))}
      </div>
    </div>
  );
};
