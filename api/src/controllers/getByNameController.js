const API_URL = process.env.API_URL;
const { Pokemon, Type } = require("../db.js");
const axios = require("axios");

const getPokemonByName = async (pokemonName) => {
  //* Find pokemon in DB
  const dbPokemon = await Pokemon.findOne({
    where: {
      name: pokemonName,
    },
    include: {
      model: Type,
    },
  });

  if (dbPokemon) {
    return {
      id: dbPokemon.id,
      name: dbPokemon.name,
      hp: dbPokemon.hp,
      attack: dbPokemon.attack,
      defense: dbPokemon.defense,
      speed: dbPokemon.speed,
      height: dbPokemon.height,
      weight: dbPokemon.weight,
      image: dbPokemon.image,
      types: dbPokemon.types.map((element) => element.name),
    };
  }

  //* GET pokemon from API
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
