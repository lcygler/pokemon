const { Pokemon, Type } = require("../db.js");
const { API_URL } = require("../utils/consts.js");
const axios = require("axios");

const getPokemonByName = async (pokemonName) => {
  // Search pokemon in DB
  const dbPokemon = await Pokemon.findOne({
    where: {
      name: pokemonName,
    },
    include: {
      model: Type,
    },
  });

  // Pokemon exists in DB
  if (dbPokemon) {
    return dbPokemon;
  }

  // GET pokemon from API
  try {
    const response = await axios.get(`${API_URL}/pokemon/${pokemonName}`);
    const pokemon = {
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
    return pokemon;
  } catch (error) {
    throw new Error("Pokemon not found");
  }
};

module.exports = getPokemonByName;
