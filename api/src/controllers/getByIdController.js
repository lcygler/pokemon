const API_URL = process.env.API_URL;
const { Pokemon, Type } = require("../db.js");
const axios = require("axios");
const uuid = require("uuid");

const getPokemonById = async (idPokemon) => {
  const isUuid = uuid.validate(idPokemon);
  let dbPokemon;

  if (isUuid) {
    //* Find pokemon
    dbPokemon = await Pokemon.findByPk(idPokemon, {
      include: {
        model: Type,
      },
    });

    if (dbPokemon) {
      //* Pokemon exists
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
    } else {
      throw new Error("Pokemon not found");
    }
  } else {
    //* GET pokemon from API
    try {
      const response = await axios.get(`${API_URL}/pokemon/${idPokemon}`);
      const apiPokemon = response.data;
      return {
        id: apiPokemon.id,
        name: apiPokemon.name,
        hp: apiPokemon.stats[0].base_stat,
        attack: apiPokemon.stats[1].base_stat,
        defense: apiPokemon.stats[2].base_stat,
        speed: apiPokemon.stats[5].base_stat,
        height: apiPokemon.height,
        weight: apiPokemon.weight,
        image: apiPokemon.sprites.other["official-artwork"]["front_default"],
        types: apiPokemon.types.map((element) => element.type.name),
      };
    } catch (error) {
      throw new Error("Pokemon not found");
    }
  }
};

module.exports = getPokemonById;
