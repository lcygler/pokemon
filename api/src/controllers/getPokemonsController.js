const API_URL = process.env.API_URL;
const { Pokemon, Type } = require("../db.js");
const axios = require("axios");

const getPokemons = async () => {
  let apiPokemons;
  //* GET pokemons from API
  try {
    const response = await axios.get(`${API_URL}/pokemon?limit=60`);
    const pokemons = response.data.results;

    apiPokemons = await Promise.all(
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
  } catch (error) {
    throw new Error("Server error");
  }

  //* GET pokemons from DB
  const dbPokemons = await Pokemon.findAll({
    include: {
      model: Type,
    },
  });

  const formattedDbPokemons = dbPokemons.map((element) => {
    const { id, name, hp, attack, defense, speed, height, weight, image, types } = element.dataValues;

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
      types: types.map((element) => element.name),
    };
  });

  //* Return all pokemons
  const allPokemons = [...formattedDbPokemons, ...apiPokemons];

  return allPokemons;
};

module.exports = getPokemons;
