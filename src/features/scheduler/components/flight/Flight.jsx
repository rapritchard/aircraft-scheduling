import cx from "classnames";
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
    className={cx(styles.container, listItemStyles.container)}
    onClick={() => onClick(ident)}
    role="button"
  >
    <h4>{ident}</h4>
    <div className={styles.meta}>
      <div className={styles.details}>
        <span>{origin}</span>
        <span>{readableDeparture}</span>
      </div>
      <div className={styles.connector}>
        <span></span>
      </div>
      <div className={styles.details}>
        <span>{destination}</span>
        <span>{readableArrival}</span>
      </div>
    </div>
  </div>
);
