import { ListItem } from "../list-item/ListItem";
import styles from "./Flight.module.css";

interface FlightCardProps {
  ident: string;
  readableDeparture: string;
  readableArrival: string;
  origin: string;
  destination: string;
  onClick: (ident: string) => void;
}

export const FlightCard = ({
  destination,
  ident,
  onClick,
  origin,
  readableArrival,
  readableDeparture,
}: FlightCardProps) => (
  <ListItem className={styles.container} onClick={() => onClick(ident)}>
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
  </ListItem>
);
