"use client";

import { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import WidthAlert from "../Components/WidthAlert";
import AlertLog from "../Components/AlertLog";
import styles from "./signin.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [windowWidth, setWindowWidth] = useState(1200);
  const [alertLog, setAlertLog] = useState(false);
  const [alertReason, setAlertReason] = useState("");

  const router = useRouter();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (email && password && confirmPassword) {
        if (password === confirmPassword) {
          const response = await axios.post(
            "https://marvel-back-d3819c392373.herokuapp.com/user/signin",
            {
              email: email,
              username: userName,
              password: password,
              confirmPassword: confirmPassword,
            }
          );
          if (response.data.token) {
            tokenCookie(response.data.token);
            userCookie(response.data);
            router.push("/");
          }
        } else {
          setAlertLog(true);
          setAlertReason("Your password are different");
        }
      } else {
        setAlertLog(true);
        setAlertReason("Missing parameters");
      }
    } catch (error) {
      setAlertLog(true);
      setAlertReason(error.response.data.message);
    }
  };

  return (
    <div>
      {windowWidth >= 900 ? (
        <div className={styles.signin}>
          <Header></Header>
          <div className={styles.main}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.signin}>
                <h2>Create your account</h2>
              </div>
              <p className={styles.presentation}>
                Fill in the required information below to create an account and
                join the incredible world of Marvel.
              </p>
              <input
                className={styles.input}
                type="text"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                className={styles.input}
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              {alertLog === true ? (
                <div onClick={() => setAlertLog(false)}>
                  <AlertLog alertReason={alertReason}></AlertLog>
                </div>
              ) : (
                <div></div>
              )}
              <button type="submit" className={styles.submit}>
                Create your account
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
