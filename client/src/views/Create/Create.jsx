import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getTypes } from "../../redux/actions";

import { validateForm } from "./validateForm";

import styles from "./Create.module.css";

const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const createdPokemon = useSelector((state) => state.createdPokemon);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() => {
    if (types.length > 0) {
      setSortedTypes(
        types.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        })
      );
    }
  }, [types]);

  useEffect(() => {
    if (Object.keys(createdPokemon).length > 0) {
      history.push(`/home/${createdPokemon.id}`);
    }
  }, [createdPokemon, history]);

  const [sortedTypes, setSortedTypes] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    type1: "",
    type2: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    type1: "",
    type2: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    validateForm(formData, errors, setErrors);

    if (Object.values(errors).every((error) => error === "")) {
      const newPokemon = {
        name: formData.name,
        hp: Math.floor(formData.hp),
        attack: Math.floor(formData.attack),
        defense: Math.floor(formData.defense),
        speed: Math.floor(formData.speed),
        height: Math.floor(formData.height),
        weight: Math.floor(formData.weight),
        image: formData.image,
        types: [formData.type1, formData.type2].filter(Boolean),
      };

      dispatch(createPokemon(newPokemon));

      setFormData({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
        type1: "",
        type2: "",
      });
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Create Pokemon</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name*:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
          <small className={errors.name ? styles.error : styles.success}>{errors.name}</small>
        </div>
        <div>
          <label htmlFor="hp">HP*:</label>
          <input type="number" id="hp" name="hp" value={formData.hp} onChange={handleInputChange} />
          <small className={errors.hp ? styles.error : styles.success}>{errors.hp}</small>
        </div>
        <div>
          <label htmlFor="attack">Attack*:</label>
          <input type="number" id="attack" name="attack" value={formData.attack} onChange={handleInputChange} />
          <small className={errors.attack ? styles.error : styles.success}>{errors.attack}</small>
        </div>
        <div>
          <label htmlFor="defense">Defense*:</label>
          <input type="number" id="defense" name="defense" value={formData.defense} onChange={handleInputChange} />
          <small className={errors.defense ? styles.error : styles.success}>{errors.defense}</small>
        </div>
        <div>
          <label htmlFor="speed">Speed:</label>
          <input type="number" id="speed" name="speed" value={formData.speed} onChange={handleInputChange} />
          <small className={errors.speed ? styles.error : styles.success}>{errors.speed}</small>
        </div>
        <div>
          <label htmlFor="height">Height:</label>
          <input type="number" id="height" name="height" value={formData.height} onChange={handleInputChange} />
          <small className={errors.height ? styles.error : styles.success}>{errors.height}</small>
        </div>
        <div>
          <label htmlFor="weight">Weight:</label>
          <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} />
          <small className={errors.weight ? styles.error : styles.success}>{errors.weight}</small>
        </div>
        <div>
          <label htmlFor="image">Image URL*:</label>
          <input type="text" id="image" name="image" value={formData.image} onChange={handleInputChange} />
          <small className={errors.image ? styles.error : styles.success}>{errors.image}</small>
        </div>
        <div>
          <label htmlFor="type1">Type 1*:</label>
          <select id="type1" name="type1" value={formData.type1} onChange={handleSelectChange}>
            <option value=""></option>
            {sortedTypes.map((element) => (
              <option key={element.id} value={element.name}>
                {element.name.charAt(0).toUpperCase() + element.name.slice(1)}
              </option>
            ))}
          </select>
          <small className={errors.type1 ? styles.error : styles.success}>{errors.type1}</small>
        </div>
        <div>
          <label htmlFor="type2">Type 2:</label>
          <select id="type2" name="type2" value={formData.type2} onChange={handleSelectChange}>
            <option value=""></option>
            {sortedTypes.map((element) => (
              <option key={element.id} value={element.name}>
                {element.name.charAt(0).toUpperCase() + element.name.slice(1)}
              </option>
            ))}
          </select>
          <small className={errors.type2 ? styles.error : styles.success}>{errors.type2}</small>
        </div>
        <button type="submit">Create</button>
        <Link to="/home" className={styles.link}>
          <button className={styles.homeButton}>Home</button>
        </Link>
      </form>
    </div>
  );
};

export default Create;
