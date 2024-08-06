import cx from "classnames";
import styles from "./ListItem.module.css";

interface ListItemProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  className: string;
}

export const ListItem = ({ children, className, onClick }: ListItemProps) => (
  <div
    className={cx(className, styles.container)}
    onClick={onClick}
    role="button"
  >
    {children}
  </div>
);
