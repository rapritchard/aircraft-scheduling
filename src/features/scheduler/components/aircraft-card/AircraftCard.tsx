import cx from "classnames";
import { ListItem } from "../list-item/ListItem";
import styles from "./Aircraft.module.css";

interface AircraftCardProps {
  ident: string;
  base: string;
  onClick: (ident: string) => void;
  selected: boolean;
  utilised: number;
}

export const AircraftCard = ({
  base,
  ident,
  onClick,
  selected,
  utilised,
}: AircraftCardProps) => {
  const getUtilisedClass = () => {
    if (utilised > 15 && utilised <= 35) {
      return "#f0710d";
    }
    if (utilised > 35) {
      return "#148a14";
    }
    return "#e61f1f";
  };

  return (
    <ListItem
      className={cx(styles.container, {
        [styles.selected]: selected,
      })}
      onClick={() => onClick(ident)}
    >
      <h4>{ident}</h4>
      <div className={styles.meta}>
        <span>{base}</span>
        <span>
          (
          <span
            style={{
              color: getUtilisedClass(),
            }}
          >
            {Math.round(utilised).toString()}%
          </span>
          )
        </span>
      </div>
    </ListItem>
  );
};
