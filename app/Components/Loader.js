import styles from "./loader.module.css";
import Header from "./Header";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <Header></Header>
      <div className={styles.main}>
        <p className={styles.loading}> Loading..</p>
      </div>
    </div>
  );
}
