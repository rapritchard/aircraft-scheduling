import listItemStyles from "../styles/ListItem.module.css";
import styles from "./Aircraft.module.css";

export const Aircraft = ({ base, ident, onClick, selected, utilised }) => {
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
    <div
      className={[
        styles.container,
        listItemStyles.container,
        selected ? styles.selected : "",
      ].join(" ")}
      onClick={() => onClick(ident)}
      role="button"
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
    </div>
  );
};
