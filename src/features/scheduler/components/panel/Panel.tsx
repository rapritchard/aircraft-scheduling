import styles from "./Panel.module.css";

interface PanelProps {
  heading: string;
  children: React.ReactNode;
  testId: string;
}

export const Panel = ({ children, heading, testId }: PanelProps) => (
  <div className={styles.container}>
    <div className={styles.heading}>
      <h2>{heading}</h2>
    </div>
    <div className={styles.list} data-testid={testId}>
      {children}
    </div>
  </div>
);
