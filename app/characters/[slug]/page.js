"use client";

import styles from "./charactersComics.module.css";
import Header from "@/app/Components/Header";
import Footer from "@/app/Components/Footer";
import Loader from "@/app/Components/Loader";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { RiAddCircleLine } from "react-icons/ri";
import { GiCrossMark } from "react-icons/gi";

export default function CharactersComics(params) {
  const param = params.params.slug;

  const [character, setCharacter] = useState();
  const [comics, setComics] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);
  const [cookieFavComics, setCookieFavComics] = useState(
    Cookies.get("favCom") || null
  );
  const [favComics, setFavComics] = useState(JSON.parse(cookieFavComics) || []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/character/${param}/comics?offset=${offset}&limit=${limit}`
        );
        const response2 = await axios.get(
          `http://localhost:4000/character/${param}?offset=${offset}&limit=${limit}`
        );
        setCharacter(response2.data.data.results[0].name);
        setComics(response.data.data.results);
        setIsLoading(false);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, [param, offset, limit]);

  const saveComics = (favArray) => {
    if (favArray) {
      Cookies.set("favCom", JSON.stringify(favArray));
    }
  };

  return isLoading ? (
    <div>
      <Loader></Loader>{" "}
    </div>
  ) : (
    <div className={styles.CharactersComics}>
      <Header></Header>
      <div className={styles.main}>
        <div className={styles.mainHead}>
          <h1 className={styles.h1}>Comics with {character}</h1>
        </div>

        <div className={styles.main}>
          <div className={styles.comicsList}>
            {comics.map((comic, index) => {
              let image =
                comic.thumbnail.path + "." + comic.thumbnail.extension;

              const checkFav = favComics.some(
                (element) => element.id === comic.id
              );

              return (
                <div className={styles.comicBox} key={comic.id}>
                  <Image
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
            <p className={styles.page}>{page}</p>
            <button
              className={styles.pagButton}
              onClick={() => {
                if (offset < limit) {
                  setOffset(offset + limit);
                  setPage(page + 1);
                }
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
