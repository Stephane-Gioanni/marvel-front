"use client";

import styles from "./favorites.module.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";
import { GiCrossMark } from "react-icons/gi";

export default function Favorites() {
  const [favCharOpen, setFavCharOpen] = useState(false);
  const [FavCharCookie, setFavCharCookie] = useState(
    Cookies.get("favChar") || null
  );
  const [favChar, setFavChar] = useState(JSON.parse(FavCharCookie) || []);
  const [favComOpen, setFavComOpen] = useState(false);
  const [favComCookie, setFavComCookie] = useState(
    Cookies.get("favCom") || null
  );
  const [favCom, setFavCom] = useState(JSON.parse(favComCookie) || []);
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  console.log(favCom);

  const editFavChar = (favArray) => {
    if (favArray) {
      Cookies.set("favChar", JSON.stringify(favArray));
    }
  };

  const editFavCom = (favArray) => {
    if (favArray) {
      Cookies.set("favCom", JSON.stringify(favArray));
    }
  };
  return (
    <div className={styles.favorites}>
      <Header></Header>
      <div className={styles.main}>
        {token ? (
          <div>
            <div className={styles.favChar}>
              {favCharOpen === true ? (
                <div className={styles.favCharSection}>
                  {favChar.length > 0 ? (
                    <div>
                      <div className={styles.mainHeadOpen}>
                        <h1>Your favorites characters</h1>
                        <div
                          onClick={() => {
                            setFavCharOpen(false);
                          }}
                          className={styles.close}
                        >
                          <IoCloseSharp />
                        </div>
                      </div>{" "}
                      <div className={styles.favList}>
                        {favChar.map((character, index) => {
                          return (
                            <div className={styles.favBox} key={character.id}>
                              <Image
                                className={styles.favImage}
                                src={character.picture}
                                alt="Picture of the comic"
                                width={500}
                                height={500}
                              ></Image>
                              <div className={styles.favBoxBottom}>
                                <p>{character.name}</p>
                                <div
                                  className={styles.addRemoveButton}
                                  onClick={() => {
                                    let newFavChar = [...favChar];

                                    for (
                                      let i = 0;
                                      i < newFavChar.length;
                                      i++
                                    ) {
                                      if (newFavChar[i].id === character.id) {
                                        newFavChar.splice(i, 1);
                                      }
                                    }
                                    setFavChar(newFavChar);
                                    editFavChar(newFavChar);
                                  }}
                                >
                                  <GiCrossMark className={styles.icon} />
                                  <p> Remove from fav</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.emptyFavCharList}>
                      <div className={styles.headerEmptyFavCharList}>
                        <div className={styles.mainHead}>
                          <h1>Your favorites characters</h1>
                        </div>
                        <p
                          onClick={() => {
                            setFavCharOpen(false);
                          }}
                          className={styles.close}
                        >
                          <IoCloseSharp />
                        </p>
                      </div>

                      <p>Your favorites characters list is empty </p>
                      <Link href="/characters">
                        <p>
                          Find some of your{" "}
                          <span className={styles.redFont}>
                            favorites characters
                          </span>{" "}
                          !
                        </p>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.favCharSection}>
                  <div className={styles.mainHead}>
                    <h1
                      className={styles.h1}
                      onClick={() => {
                        setFavCharOpen(true);
                      }}
                    >
                      Open your favorites characters
                    </h1>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.favCom}>
              {favComOpen === true ? (
                <div className={styles.favCharSection}>
                  {favCom.length > 0 ? (
                    <div>
                      <div className={styles.mainHeadOpen}>
                        <h1>Your favorites comics</h1>
                        <p
                          onClick={() => {
                            setFavComOpen(false);
                          }}
                          className={styles.close}
                        >
                          <IoCloseSharp />
                        </p>
                      </div>{" "}
                      <div className={styles.favList}>
                        {favCom.map((comic, index) => {
                          return (
                            <div className={styles.favBox} key={comic.id}>
                              <Image
                                className={styles.favImage}
                                src={comic.picture}
                                alt="Picture of the comic"
                                width={500}
                                height={500}
                              ></Image>
                              <div className={styles.favBoxBottom}>
                                <p>{comic.title}</p>
                                <div
                                  className={styles.addRemoveButton}
                                  onClick={() => {
                                    let newfavCom = [...favCom];

                                    for (let i = 0; i < newfavCom.length; i++) {
                                      if (newfavCom[i].id === comic.id) {
                                        newfavCom.splice(i, 1);
                                      }
                                    }
                                    setFavCom(newfavCom);
                                    editFavCom(newfavCom);
                                  }}
                                >
                                  <GiCrossMark className={styles.icon} />
                                  <p> Remove from fav</p>{" "}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.emptyFavComList}>
                      <div className={styles.headerEmptyfavComList}>
                        <div className={styles.mainHead}>
                          <h1>Your favorites comics</h1>
                        </div>
                        <p
                          onClick={() => {
                            setFavComOpen(false);
                          }}
                          className={styles.close}
                        >
                          <IoCloseSharp />
                        </p>
                      </div>

                      <p>Your favorites comics list is empty </p>
                      <Link href="/comics">
                        <p>
                          Find some of your{" "}
                          <span className={styles.redFont}>
                            favorites comics
                          </span>{" "}
                          !
                        </p>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.favComSection}>
                  <p
                    onClick={() => {
                      setFavComOpen(true);
                    }}
                  >
                    <div className={styles.mainHead}>
                      <h1 className={styles.h1}>
                        {" "}
                        Open your favorites comics.
                      </h1>
                    </div>{" "}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <p>You must have an account to save favorites</p>
            <p>
              <Link href="/signin"> Create one</Link> or{" "}
              <Link href="/login">login</Link>
            </p>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}
