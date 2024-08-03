import { useContext } from "react";
import { ScheduleContext } from "../../../../stores/schedule-context";
import { Aircraft } from "../aircraft/Aircraft";
import styles from "../styles/Panel.module.css";

export const AircraftList = () => {
  const { schedule, scheduleDispatch } = useContext(ScheduleContext);
  const { aircraft, selectedAircraftIdent } = schedule;
  const sortedAircraft = [...aircraft].sort((a, b) => b.utilised - a.utilised);

  const handleAircraftClick = (ident) => {
    scheduleDispatch({
      type: "SELECT_AIRCRAFT",
      payload: ident,
    });
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeading}>
        <h2>Aircraft</h2>
      </div>
      <div className={styles.panelContainer}>
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
