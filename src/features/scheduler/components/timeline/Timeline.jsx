import { turnaroundInSeconds, secondsPerDay } from "../../utils/date";
import styles from "./Timeline.module.css";

export const Timeline = ({ flights = [] }) => (
  <div className={styles.timeline}>
    <div className={styles.timelineLabels}>
      <span>0:00</span>
      <span>12:00</span>
      <span></span>
    </div>
    <div className={styles.timelineTrack}>
      {flights.map((flight) => {
        const { arrivaltime, departuretime, ident } = flight;
        const start = departuretime / secondsPerDay;
        const end = (arrivaltime + turnaroundInSeconds) / secondsPerDay;

        return (
          <div
            key={ident}
            className={styles.timelineBlock}
            style={{
              left: `${start * 100}%`,
              width: `${end * 100 - start * 100}%`,
            }}
          >
            <div
              className={styles.timelineTurnover}
              style={{
                width: `${
                  (turnaroundInSeconds / secondsPerDay / (end - start)) * 100
                }%`,
              }}
            />
          </div>
        );
      })}
    </div>
    <div className={styles.timelineKeys}>
      <div className={styles.timelineKey}>
        <span className={styles.circle}></span>
        <span>Idle</span>
      </div>
      <div className={[styles.timelineKey, styles.active].join(" ")}>
        <span className={styles.circle}></span>
        <span>Scheduled</span>
      </div>
      <div className={[styles.timelineKey, styles.turnaround].join(" ")}>
        <span className={styles.circle}></span>
        <span>Turnaround</span>
      </div>
    </div>
  </div>
);
