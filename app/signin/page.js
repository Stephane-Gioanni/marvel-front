"use client";

import { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import styles from "./signin.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

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
            "http://localhost:4000/user/signin",
            {
              email: email,
              username: userName,
              password: password,
              confirmPassword: confirmPassword,
            }
          );
          console.log(response.data);
          if (response.data.token) {
            tokenCookie(response.data.token);
            userCookie(response.data);
            router.push("/");
          }
        } else {
          alert("Your password are different");
        }
      } else {
        alert("Missing parameters");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className={styles.signin}>
      <Header></Header>
      <div className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.signin}>
            <h2>Create your account</h2>
          </div>
          <p className={styles.presentation}>
            Fill in the required information below to create an account and join
            the incredible world of Marvel.
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
          <button type="submit" className={styles.submit}>
            Create your account
          </button>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
}
