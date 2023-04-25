import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getAll, getTypes } from "../../redux/actions";

import { validateForm } from "./validateForm";

import styles from "./Create.module.css";

const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const allPokemons = useSelector((state) => state.allPokemons);
  const selectedPokemon = useSelector((state) => state.selectedPokemon);

  useEffect(() => {
    dispatch(getAll());
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() => {
    if (selectedPokemon.id) {
      history.push(`/home/${selectedPokemon.id}`);
    }
  }, [selectedPokemon, history]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForm = (e) => {
    const { form } = e.target;

    const formFields = {};
    for (const element of form.elements) {
      if (element.name) {
        formFields[element.name] = element.value;
      }
    }

    validateForm(formFields, errors, setErrors, allPokemons);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && Object.values(errors).every((error) => error === "")) {
      const newPokemon = {
        name: formData.name.trim().toLowerCase(),
        hp: Math.floor(formData.hp),
        attack: Math.floor(formData.attack),
        defense: Math.floor(formData.defense),
        speed: Math.floor(formData.speed),
        height: Math.floor(formData.height),
        weight: Math.floor(formData.weight),
        image: formData.image.trim(),
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

  return (
    <div>
      <h2>Create Pokemon</h2>
      <form onChange={handleForm} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          <small className={styles.error}>{errors.name}</small>
        </div>
        <div>
          <label htmlFor="hp">HP</label>
          <input type="number" id="hp" name="hp" min="0" max="255" value={formData.hp} onChange={handleChange} />
          <small className={styles.error}>{errors.hp}</small>
        </div>
        <div>
          <label htmlFor="attack">Attack</label>
          <input
            type="number"
            id="attack"
            name="attack"
            min="0"
            max="255"
            value={formData.attack}
            onChange={handleChange}
          />
          <small className={styles.error}>{errors.attack}</small>
        </div>
        <div>
          <label htmlFor="defense">Defense:</label>
          <input
            type="number"
            id="defense"
            name="defense"
            min="0"
            max="255"
            value={formData.defense}
            onChange={handleChange}
          />
          <small className={styles.error}>{errors.defense}</small>
        </div>
        <div>
          <label htmlFor="speed">Speed</label>
          <input
            type="number"
            id="speed"
            name="speed"
            min="0"
            max="255"
            value={formData.speed}
            onChange={handleChange}
          />
          <small className={styles.error}>{errors.speed}</small>
        </div>
        <div>
          <label htmlFor="height">Height</label>
          <input
            type="number"
            id="height"
            name="height"
            min="1"
            max="14"
            value={formData.height}
            onChange={handleChange}
          />
          <small className={styles.error}>{errors.height}</small>
        </div>
        <div>
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            id="weight"
            name="weight"
            min="1"
            max="999"
            value={formData.weight}
            onChange={handleChange}
          />
          <small className={styles.error}>{errors.weight}</small>
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
          <small className={styles.error}>{errors.image}</small>
        </div>
        <div>
          <label htmlFor="type1">Type 1</label>
          <select id="type1" name="type1" value={formData.type1} onChange={handleChange}>
            <option value=""></option>
            {types.map((element) => (
              <option key={element.id} value={element.name}>
                {element.name.charAt(0).toUpperCase() + element.name.slice(1)}
              </option>
            ))}
          </select>
          <small className={styles.error}>{errors.type1}</small>
        </div>
        <div>
          <label htmlFor="type2">Type 2</label>
          <select id="type2" name="type2" value={formData.type2} onChange={handleChange}>
            <option value=""></option>
            {types
              .filter((element) => element.name !== "unknown")
              .map((element) => (
                <option key={element.id} value={element.name}>
                  {element.name.charAt(0).toUpperCase() + element.name.slice(1)}
                </option>
              ))}
          </select>
          <small className={styles.error}>{errors.type2}</small>
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
