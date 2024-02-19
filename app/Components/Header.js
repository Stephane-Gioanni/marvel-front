"use client";

import styles from "./header.module.css";
import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import Logo from "../Images/Marvel.png";

export default function Header() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const [userCookie, setUserCookie] = useState(
    Cookies.get("userInfos") || null
  );
  const [user, setUser] = useState(JSON.parse(userCookie) || null);

  const removeCookie = () => {
    Cookies.remove("userToken");
    Cookies.remove("userInfos");
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerTop}>
        <div>
          {token ? (
            <div className={styles.loggedSection}>
              <p className={styles.username}>{user.username}</p>
              <p
                className={styles.logOff}
                onClick={() => {
                  setToken(null);
                  removeCookie(token);
                  window.location.reload();
                }}
              >
                Log Off
              </p>
            </div>
          ) : (
            <div className={styles.logSection}>
              <Link href="/signin">
                <p className={styles.headerButton}>Sign in</p>
              </Link>
              <Link href="/login">
                <p className={styles.headerButton}>Login</p>
              </Link>
            </div>
          )}
        </div>
        <div>
          <Link href="/">
            <Image
              src={Logo}
              height={30}
              width={100}
              alt="logo"
              className={styles.logo}
            ></Image>
          </Link>
        </div>
        <div className={styles.headerButtonsSection}>
          <Link href="/characters">
            <p className={styles.headerButton}>Characters</p>
          </Link>
          <Link href="/comics">
            <p className={styles.headerButton}>Comics</p>
          </Link>
          <Link href="/favorites">
            <p className={styles.headerButton}>Favorites</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
