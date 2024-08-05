import cx from "classnames";
import { turnaroundInSeconds, secondsPerDay } from "../../utils/date";
import styles from "./Timeline.module.css";

export const Timeline = ({ flights = [] }) => (
  <div className={styles.container}>
    <div className={styles.labels}>
      <span>0:00</span>
      <span>12:00</span>
      <span></span>
    </div>
    <div className={styles.track}>
      {flights.map((flight) => {
        const { arrivaltime, departuretime, ident } = flight;
        const start = departuretime / secondsPerDay;
        const end = (arrivaltime + turnaroundInSeconds) / secondsPerDay;

        return (
          <div
            key={ident}
            className={styles.trackBlock}
            style={{
              left: `${start * 100}%`,
              width: `${end * 100 - start * 100}%`,
            }}
          >
            <div
              className={styles.turnover}
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
    <div className={styles.keys}>
      <div className={styles.key}>
        <span className={styles.circle}></span>
        <span>Idle</span>
      </div>
      <div className={cx(styles.key, styles.active)}>
        <span className={styles.circle}></span>
        <span>Scheduled</span>
      </div>
      <div className={cx(styles.key, styles.turnaround)}>
        <span className={styles.circle}></span>
        <span>Turnaround</span>
      </div>
    </div>
  </div>
);
