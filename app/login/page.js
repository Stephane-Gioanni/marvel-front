/* eslint-disable react/no-unescaped-entities */
"use client";

import axios from "axios";
import Cookies from "js-cookie";
import styles from "./login.module.css";
import Header from "../Components/Header";
import WidthAlert from "../Components/WidthAlert";
import AlertLog from "../Components/AlertLog";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "../Components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [windowWidth, setWindowWidth] = useState(1200);
  const [alertLog, setAlertLog] = useState(false);
  const [alertReason, setAlertReason] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const tokenCookie = (tokenToSet) => {
    if (tokenToSet) {
      Cookies.set("userToken", tokenToSet);
    }
  };

  const userCookie = (userInfos) => {
    if (userInfos) {
      Cookies.set("userInfos", JSON.stringify(userInfos));
    }
  };

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://marvel-back-d3819c392373.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        tokenCookie(response.data.token);
        userCookie(response.data);

        router.push("/");
      } else {
        setAlertReason(error.response.data.message);

        setAlertLog(true);
      }
    } catch (error) {
      setAlertReason(error.response.data.message);

      setAlertLog(true);
    }
  };

  return (
    <div>
      {windowWidth >= 900 ? (
        <div className={styles.login}>
          <Header></Header>

          <div className={styles.main}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.login}>
                <h2>Login</h2>
              </div>

              <p className={styles.presentation}>
                Log into your Marvel account. If you don't have one, you can
                create one{" "}
                <Link href="/signin" className={styles.here}>
                  here
                </Link>
                .
              </p>
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {alertLog === true ? (
                <div onClick={() => setAlertLog(false)}>
                  <AlertLog alertReason={alertReason}></AlertLog>
                </div>
              ) : (
                <div></div>
              )}
              <button className={styles.submit} type="submit">
                Login
              </button>
            </form>
          </div>
          <Footer></Footer>
        </div>
      ) : (
        <div>
          <WidthAlert></WidthAlert>
        </div>
      )}
    </div>
  );
}
