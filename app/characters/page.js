"use client";

import styles from "./character.module.css";
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import { RiAddCircleLine } from "react-icons/ri";
import { GiCrossMark } from "react-icons/gi";
import { SiReaddotcv } from "react-icons/si";

export default function Characters() {
  const [connected, setConnected] = useState(Cookies.get("userToken") || null);
  const [charactersList, setCharactersList] = useState();
  const [charactersListFiltered, setCharactersListFiltered] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);
  const [favCharCookie, setFavCharCookie] = useState(
    Cookies.get("favChar") || null
  );
  const [favChar, setFavChar] = useState(JSON.parse(favCharCookie) || []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-back-d3819c392373.herokuapp.com/characters?offset=${offset}&limit=${limit}`
        );

        setCharactersList(response.data.data);
        setIsLoading(false);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, [offset, limit, favChar]);

  const search = async (offset, page) => {
    try {
      const response = await axios.get(
        `https://marvel-back-d3819c392373.herokuapp.com/characters/search?searchInput=${searchInput}&offset=${offset}&limit=${limit}`
      );
      setCharactersListFiltered(response.data.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const saveFav = (favChar) => {
    if (favChar) {
      Cookies.set("favChar", JSON.stringify(favChar));
    }
  };

  return isLoading ? (
    <div>
      <Loader></Loader>
    </div>
  ) : (
    <div className={styles.characters}>
      <Header></Header>
      <div className={styles.main}>
        <div className={styles.mainHead}>
          <h1>MARVEL CHARACTERS LIST</h1>
        </div>
        <div className={styles.searchSection}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <div className={styles.searchButtons}>
            <button
              className={styles.searchButton}
              onClick={() => {
                const newOffset = 0;
                const newPage = 1;
                setOffset(newOffset);
                setPage(newPage);
                search(newOffset, newPage);
              }}
            >
              Search
            </button>
            <button
              className={styles.searchButton}
              onClick={() => {
                setOffset(0);
                setSearchInput("");
                setCharactersListFiltered(null);
              }}
            >
              Reset search
            </button>
          </div>
        </div>
        {charactersListFiltered ? (
          <div>
            <div className={styles.charactersList}>
              {charactersListFiltered.results.map((character, index) => {
                let image =
                  character.thumbnail.path +
                  "." +
                  character.thumbnail.extension;

                const checkFav = favChar.some(
                  (element) => element.id === character.id
                );
                return (
                  <div className={styles.characterBox} key={character.id}>
                    <Image
                      className={styles.characterImage}
                      src={image}
                      alt="Picture of the character"
                      width={500}
                      height={500}
                    />

                    <div className={styles.characterBoxBottom}>
                      <h3>{character.name}</h3>

                      {connected ? (
                        <div>
                          {checkFav === false ? (
                            <div
                              className={styles.addRemoveButton}
                              onClick={() => {
                                let newFavChar = [...favChar];

                                newFavChar.push({
                                  name: character.name,
                                  id: character.id,
                                  picture: image,
                                });

                                setFavChar(newFavChar);
                                saveFav(newFavChar);
                              }}
                            >
                              <RiAddCircleLine className={styles.icon} />
                              <p> Add to fav</p>
                            </div>
                          ) : (
                            <div
                              className={styles.addRemoveButton}
                              onClick={() => {
                                let newFavChar = [...favChar];

                                for (let i = 0; i < newFavChar.length; i++) {
                                  if (newFavChar[i].id === character.id) {
                                    newFavChar.splice(i, 1);
                                  }
                                }

                                setFavChar(newFavChar);
                                saveFav(newFavChar);
                              }}
                            >
                              <GiCrossMark className={styles.icon} />
                              <p> Remove from fav</p>{" "}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          className={styles.addRemoveButton}
                          onClick={() => alert("You must be connected")}
                        >
                          <RiAddCircleLine className={styles.icon} />
                          <p> Add to fav</p>
                        </div>
                      )}
                      <Link href={`/characters/${character.id}`}>
                        <div className={styles.ComicsWith}>
                          <SiReaddotcv className={styles.icon} />
                          <p>Comics with </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.pagination}>
              {offset >= limit ? (
                <button
                  className={styles.pagButton}
                  onClick={() => {
                    if (offset >= limit) {
                      const newOffset = offset - limit;
                      const newPage = page - 1;
                      setOffset(newOffset);
                      setPage(newPage);
                      search(newOffset, newPage);
                    }
                  }}
                >
                  Previous
                </button>
              ) : (
                <div className={styles.invisibleButton}></div>
              )}

              <p className={styles.page}>{page}</p>

              {offset < charactersListFiltered.total &&
              charactersListFiltered.count >= limit ? (
                <button
                  className={styles.pagButton}
                  onClick={() => {
                    if (
                      offset < charactersListFiltered.total &&
                      charactersListFiltered.count >= limit
                    ) {
                      const newOffset = offset + limit;
                      const newPage = page + 1;
                      setOffset(newOffset);
                      setPage(newPage);
                      search(newOffset, newPage);
                    }
                  }}
                >
                  Next
                </button>
              ) : (
                <div className={styles.invisibleButton}></div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.charactersList}>
              {charactersList.results.map((character, index) => {
                let image =
                  character.thumbnail.path +
                  "." +
                  character.thumbnail.extension;

                const checkFav = favChar.some(
                  (element) => element.id === character.id
                );

                return (
                  <div className={styles.characterBox} key={character.id}>
                    <Image
                      priority
                      className={styles.characterImage}
                      src={image}
                      alt="Picture of the character"
                      width={500}
                      height={500}
                    />
                    <div className={styles.characterBoxBottom}>
                      <h3>{character.name}</h3>

                      {connected ? (
                        <div>
                          {checkFav === false ? (
                            <div
                              className={styles.addRemoveButton}
                              onClick={() => {
                                let newFavChar = [...favChar];

                                newFavChar.push({
                                  name: character.name,
                                  id: character.id,
                                  picture: image,
                                });

                                setFavChar(newFavChar);
                                saveFav(newFavChar);
                              }}
                            >
                              <RiAddCircleLine className={styles.icon} />
                              <p> Add to fav</p>
                            </div>
                          ) : (
                            <div
                              className={styles.addRemoveButton}
                              onClick={() => {
                                let newFavChar = [...favChar];

                                for (let i = 0; i < newFavChar.length; i++) {
                                  if (newFavChar[i].id === character.id) {
                                    newFavChar.splice(i, 1);
                                  }
                                }

                                setFavChar(newFavChar);
                                saveFav(newFavChar);
                              }}
                            >
                              <GiCrossMark className={styles.icon} />
                              <p> Remove from fav</p>{" "}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          className={styles.addRemoveButton}
                          onClick={() => alert("You must be connected")}
                        >
                          <RiAddCircleLine className={styles.icon} />
                          <p> Add to fav</p>
                        </div>
                      )}

                      <Link href={`/characters/${character.id}`}>
                        <div className={styles.ComicsWith}>
                          <SiReaddotcv className={styles.icon} />
                          <p>Comics with </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.pagination}>
              {offset >= limit ? (
                <button
                  className={styles.pagButton}
                  onClick={() => {
                    if (offset >= limit) {
                      setOffset(offset - limit);
                      setPage(page - 1);
                    }
                  }}
                >
                  Previous
                </button>
              ) : (
                <div className={styles.invisibleButton}></div>
              )}

              <p className={styles.page}>{page}</p>
              <button
                className={styles.pagButton}
                onClick={() => {
                  setOffset(offset + limit);
                  setPage(page + 1);
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}
