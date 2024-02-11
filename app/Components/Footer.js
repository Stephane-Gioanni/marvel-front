import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <p>Made by Stephane G.</p>
        <p>2024</p>
        <Link href="https://stephane-g-portfolio.vercel.app/">
          {" "}
          <p>Portfolio</p>
        </Link>
      </div>
    </div>
  );
}
