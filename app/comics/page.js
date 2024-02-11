"use client";

import styles from "./comics.module.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { RiAddCircleLine } from "react-icons/ri";
import { GiCrossMark } from "react-icons/gi";

export default function Comics() {
  const [comicsList, setComicsList] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [comicsListFiltered, setComicsListFiltered] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(100);
  const [total, setTotal] = useState();
  const [cookieFavComics, setCookieFavComics] = useState(
    Cookies.get("favCom") || null
  );
  const [favComics, setFavComics] = useState(JSON.parse(cookieFavComics) || []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/comics?offset=${offset}&limit=${limit}`
        );
        setComicsList(response.data.data.results);
        setTotal(response.data.data.total);
        setIsLoading(false);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, [offset, limit]);

  const search = async (offset, page) => {
    const response = await axios.get(
      `http://localhost:4000/comics/search?searchInput=${searchInput}&offset=${offset}&limit=${limit}`
    );

    setComicsListFiltered(response.data.data);
    console.log("comicsListFiltered", comicsListFiltered);
  };

  const saveComics = (favArray) => {
    if (favArray) {
      Cookies.set("favCom", JSON.stringify(favArray));
    }
  };

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div className={styles.comics}>
      <Header></Header>
      <div className={styles.main}>
        <div className={styles.mainHead}>
          <h1>MARVEL COMICS LIST</h1>
        </div>

        <div className={styles.searchSection}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search "
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <div className={styles.searchButtons}>
            <button
              className={styles.searchButton}
              onClick={() => {
                setPage(1);
                search();
              }}
            >
              Search
            </button>
            <button
              className={styles.searchButton}
              onClick={() => {
                setComicsListFiltered(null);
                setSearchInput("");
                setOffset(0);
                setPage(1);
              }}
            >
              Reset search
            </button>
          </div>
        </div>
        {comicsListFiltered ? (
          <div>
            <div>
              <div className={styles.comicsList}>
                {comicsListFiltered.results.map((comic, index) => {
                  let image =
                    comic.thumbnail.path + "." + comic.thumbnail.extension;

                  const checkFav = favComics.some(
                    (element) => element.id === comic.id
                  );

                  return (
                    <div className={styles.comicBox} key={comic.id}>
                      <Image
                        priority
                        className={styles.comicImage}
                        src={image}
                        alt="Picture of the comic"
                        width={500}
                        height={500}
                      />
                      <div className={styles.comicBoxBottom}>
                        <p>{comic.title}</p>
                        {checkFav === true ? (
                          <div
                            className={styles.addRemoveButton}
                            onClick={() => {
                              let newFavComics = [...favComics];
                              for (let i = 0; i < newFavComics.length; i++) {
                                if (newFavComics[i].id === comic.id) {
                                  newFavComics.splice(i, 1);
                                }
                                setFavComics(newFavComics);
                                saveComics(newFavComics);
                              }
                            }}
                          >
                            <GiCrossMark className={styles.icon} />
                            <p> Remove from fav</p>
                          </div>
                        ) : (
                          <div
                            className={styles.addRemoveButton}
                            onClick={() => {
                              let newFavComics = [...favComics];
                              newFavComics.push({
                                title: comic.title,
                                id: comic.id,
                                picture: image,
                              });
                              setFavComics(newFavComics);
                              saveComics(newFavComics);
                            }}
                          >
                            <RiAddCircleLine className={styles.icon} />
                            <p> Add to fav</p>
                          </div>
                        )}
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

                {offset < comicsListFiltered.total &&
                comicsListFiltered.count >= limit ? (
                  <button
                    className={styles.pagButton}
                    onClick={() => {
                      if (
                        offset < comicsListFiltered.total &&
                        comicsListFiltered.count >= limit
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
          </div>
        ) : (
          <div>
            <div className={styles.comicsList}>
              {comicsList.map((comic, index) => {
                let image =
                  comic.thumbnail.path + "." + comic.thumbnail.extension;

                const checkFav = favComics.some(
                  (element) => element.id === comic.id
                );
                return (
                  <div className={styles.comicBox} key={comic.id}>
                    <Image
                      priority
                      className={styles.comicImage}
                      src={image}
                      alt="Picture of the comic"
                      width={500}
                      height={500}
                    />
                    <div className={styles.comicBoxBottom}>
                      <p>{comic.title}</p>
                      {checkFav === true ? (
                        <div
                          className={styles.addRemoveButton}
                          onClick={() => {
                            let newFavComics = [...favComics];

                            for (let i = 0; i < newFavComics.length; i++) {
                              if (newFavComics[i].id === comic.id) {
                                newFavComics.splice(i, 1);
                              }
                              setFavComics(newFavComics);
                              saveComics(newFavComics);
                            }
                          }}
                        >
                          <GiCrossMark className={styles.icon} />
                          <p> Remove from fav</p>{" "}
                        </div>
                      ) : (
                        <div
                          className={styles.addRemoveButton}
                          onClick={() => {
                            let newFavComics = [...favComics];
                            newFavComics.push({
                              title: comic.title,
                              id: comic.id,
                              picture: image,
                            });
                            setFavComics(newFavComics);
                            saveComics(newFavComics);
                          }}
                        >
                          <RiAddCircleLine className={styles.icon} />
                          <p> Add to fav</p>
                        </div>
                      )}
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
              {offset < total ? (
                <button
                  className={styles.pagButton}
                  onClick={() => {
                    if (offset < total) {
                      setOffset(offset + limit);
                      setPage(page + 1);
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
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}
