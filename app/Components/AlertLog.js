import styles from "./alert.module.css";

export default function AlertLog({ alertReason }) {
  return (
    <div className={styles.alert}>
      <p> {alertReason}</p>
    </div>
  );
}
