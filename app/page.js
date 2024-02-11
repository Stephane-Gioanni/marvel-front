/* eslint-disable react/no-unescaped-entities */
import styles from "./page.module.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { IoIosWarning } from "react-icons/io";

export default function Home() {
  return (
    <div className={styles.home}>
      <Header></Header>
      <div className={styles.main}>
        <p>Welcome on the Marvel world !</p>

        <p>
          On this website, you will be able to search for and find your favorite
          characters and comics in our database. <br />
          To do this, I have created a server that then calls the official
          Marvel API to obtain the responses. <br />
          For each character, you will have access to a list of comics where
          they can be found. <br />
          You can also create your own user profile and save your favorite
          characters and comics as favorites. <br />
          It will, of course, be possible to edit these lists.
        </p>
        <div className={styles.warning}>
          <IoIosWarning className={styles.icon} />
          <p>
            When utilizing the search functionality, please note that the
            response may be slow. Thank you.
          </p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
