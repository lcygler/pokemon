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

  const selectedPokemon = useSelector((state) => state.selectedPokemon);
  const { id, name, image, hp, attack, defense, speed = null, height = null, weight = null, types } = selectedPokemon;
  const formattedName = name?.toUpperCase();
  const formattedTypes = types?.map((element) => element.charAt(0).toUpperCase() + element.slice(1));
  const [type1, type2] = formattedTypes || [];

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

          <div className={styles.propsContainer}>
            {image && <img src={image} alt="" className={styles.image} />}

            <div className={styles.textContainer}>
              <p className={styles.text}>ID: {id}</p>

              <div className={styles.textRow}>
                <p className={styles.text}>HP: {hp}</p>
                {speed > 0 && <p className={styles.text}>Speed: {speed}</p>}
              </div>

              <div className={styles.textRow}>
                <p className={styles.text}>Attack: {attack}</p>
                <p className={styles.text}>Defense: {defense}</p>
              </div>

              <div className={styles.textRow}>
                {height > 0 && <p className={styles.text}>Height: {height}</p>}
                {weight > 0 && <p className={styles.text}>Weight: {weight}</p>}
              </div>

              <div className={styles.textRow}>
                <p className={styles.text}>Type 1: {type1}</p>
                {type2 && <p className={styles.text}>Type 2: {type2}</p>}
              </div>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Link to="/home" className={styles.link}>
              <button className={styles.homeButton}>Home</button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {showError ? (
            <div className={styles.errorContainer}>
              <p className={styles.error}>Error loading data. Please try again</p>
              <Link to="/home" className={styles.link}>
                <button className={styles.homeButton}>Home</button>
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
