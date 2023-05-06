import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { clearDetail, getById, getByName } from "../../redux/actions";

import { uuidRegex } from "../../utils/consts";
import styles from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const { idOrName } = useParams();
  const [showError, setShowError] = useState(false);

  const {
    name,
    image,
    hp,
    attack,
    defense,
    speed = null,
    height = null,
    weight = null,
    types,
  } = useSelector((state) => state.selectedPokemon);

  const formattedName = name?.toUpperCase();

  const [type1, type2] = (types || []).map(
    (element) => element.charAt(0).toUpperCase() + element.slice(1)
  );

  const input = String(idOrName).trim();
  const isUuid = uuidRegex.test(input);
  const isNumber = !isNaN(Number(input));

  useEffect(() => {
    if (isUuid || isNumber) {
      dispatch(getById(input));
    } else if (typeof input === "string") {
      dispatch(getByName(input));
    }
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, input, isUuid, isNumber]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(true);
    }, 10000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={styles.container}>
      {name ? (
        <div className={styles.cardContainer}>
          <h2 className={styles.name}>{formattedName}</h2>

          <div className={styles.detailContainer}>
            {image && <img src={image} alt="" className={styles.image} />}

            <div className={styles.statsContainer}>
              <div className={styles.statsRow}>
                <p className={styles.stat}>HP: {hp}</p>
                <p className={styles.stat}>Speed: {speed > 0 ? speed : "-"}</p>
              </div>

              <div className={styles.statsRow}>
                <p className={styles.stat}>Attack: {attack}</p>
                <p className={styles.stat}>Defense: {defense}</p>
              </div>

              <div className={styles.statsRow}>
                <p className={styles.stat}>Height: {height > 0 ? height : "-"}</p>
                <p className={styles.stat}>Weight: {weight > 0 ? weight : "-"}</p>
              </div>

              <div className={styles.statsRow}>
                <p className={styles.types}>Type: {`${type1} ${type2 ? "& " + type2 : ""}`}</p>
              </div>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Link to="/home" className={styles.link}>
              <button className={styles.homeButton}></button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {showError ? (
            <div className={styles.errorContainer}>
              <p className={styles.error}>Error loading data. Please try again</p>
              <Link to="/home" className={styles.link}>
                <button className={styles.homeButton}></button>
              </Link>
            </div>
          ) : (
            <span className={styles.loader}></span>
          )}
        </>
      )}
    </div>
  );
};

export default Detail;
