import listItemStyles from "../styles/ListItem.module.css";
import styles from "./Flight.module.css";

export const Flight = ({
  destination,
  ident,
  onClick,
  origin,
  readableArrival,
  readableDeparture,
}) => (
  <div
    className={[styles.flight, listItemStyles.listItem].join(" ")}
    onClick={() => onClick(ident)}
    role="button"
  >
    <h4>{ident}</h4>
    <div className={styles.flightMeta}>
      <div className={styles.flightDetails}>
        <span>{origin}</span>
        <span>{readableDeparture}</span>
      </div>
      <div className={styles.flightConnector}>
        <span></span>
      </div>
      <div className={styles.flightDetails}>
        <span>{destination}</span>
        <span>{readableArrival}</span>
      </div>
    </div>
  </div>
);
