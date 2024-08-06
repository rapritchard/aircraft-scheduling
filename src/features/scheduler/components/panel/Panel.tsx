import styles from "./Panel.module.css";

interface PanelProps {
  heading: string;
  children: React.ReactNode;
}

export const Panel = ({ children, heading }: PanelProps) => (
  <div className={styles.container}>
    <div className={styles.heading}>
      <h2>{heading}</h2>
    </div>
    <div className={styles.list} data-testid="flightsList">
      {children}
    </div>
  </div>
);
