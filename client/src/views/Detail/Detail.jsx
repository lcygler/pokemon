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

  useEffect(() => {
    if (uuidRegex.test(idOrName) || !isNaN(idOrName)) {
      dispatch(getById(idOrName));
    } else if (typeof idOrName === "string") {
      dispatch(getByName(idOrName));
    }

    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, idOrName]);

  const selectedPokemon = useSelector((state) => state.selectedPokemon);
  const { id, name, image, hp, attack, defense, speed = null, height = null, weight = null, types } = selectedPokemon;
  const formattedName = name?.toUpperCase();
  const formattedTypes = types?.map((element) => element.charAt(0).toUpperCase() + element.slice(1)).join(", ");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={styles.container}>
      {name ? (
        <div className={styles.textContainer}>
          <h2 className={styles.name}>{formattedName}</h2>

          <img src={image} alt="" className={styles.image} />

          <p className={styles.text}>ID: {id}</p>
          <p className={styles.text}>Attack: {attack}</p>
          <p className={styles.text}>Defense: {defense}</p>

          {speed && <p className={styles.text}>Speed: {hp}</p>}
          {height && <p className={styles.text}>Height: {height}</p>}
          {weight && <p className={styles.text}>Weight: {weight}</p>}

          {formattedTypes && <p className={styles.text}>Type: {formattedTypes}</p>}

          <Link to="/home" className={styles.link}>
            <button className={styles.homeButton}>Home</button>
          </Link>
        </div>
      ) : (
        <>
          {showError ? (
            <div>
              <h3 className={styles.error}>Oops! Pokemon not found 👀</h3>
              <p className={styles.error}>Please check the spelling and try again</p>
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
