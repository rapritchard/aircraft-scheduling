import { useContext } from "react";
import { ScheduleContext } from "../../../../stores/schedule-context";
import { formatDate } from "../../utils/date";
import styles from "./Header.module.css";

export const Header = () => {
  const {
    schedule: { date },
  } = useContext(ScheduleContext);
  const formattedDate = formatDate(date);
  return (
    <div className={styles.header}>
      <span>{formattedDate}</span>
    </div>
  );
};
