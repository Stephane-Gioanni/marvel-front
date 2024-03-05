import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerSectionFirst}>
          <p>Made by Stephane G.</p>
        </div>
        <div className={styles.footerSection}>
          <p>2024</p>
        </div>

        <div className={styles.footerSectionLast}>
          {" "}
          <Link href="https://hellofromsg.vercel.app/">
            {" "}
            <p>Portfolio</p>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}
