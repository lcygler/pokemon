const { Pokemon, Type } = require("../db.js");
const { API_URL } = require("../utils/consts.js");
const axios = require("axios");

const getAllPokemons = async () => {
  // GET pokemons from API
  const response = await axios.get(`${API_URL}/pokemon?limit=3`); // total 1279
  const pokemons = response.data.results;

  const apiPokemons = await Promise.all(
    pokemons.map(async (element) => {
      const response = await axios.get(element.url);
      return {
        id: response.data.id,
        name: response.data.name,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        speed: response.data.stats[5].base_stat,
        height: response.data.height,
        weight: response.data.weight,
        image: response.data.sprites.other["official-artwork"]["front_default"],
        types: response.data.types.map((element) => element.type.name),
      };
    })
  );

  const dbPokemons = await Pokemon.findAll({
    include: {
      model: Type,
    },
  });

  const formattedDbPokemons = dbPokemons.map((element) => {
    const { id, name, hp, attack, defense, speed, height, weight, image, types } = element.dataValues;

    const formattedTypes = types.map((element) => element.name);

    return {
      id,
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      types: formattedTypes,
    };
  });

  const allPokemons = [...formattedDbPokemons, ...apiPokemons];

  return allPokemons;
};

module.exports = getAllPokemons;
