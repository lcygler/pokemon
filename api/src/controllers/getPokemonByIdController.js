const { Pokemon, Type } = require("../db.js");
const { API_URL } = require("../utils/consts.js");
const axios = require("axios");
const uuid = require("uuid");

const getPokemonByIdController = async (idPokemon) => {
  const isUuid = uuid.validate(idPokemon);
  let dbPokemon;
  let pokemon;

  if (isUuid) {
    // Search pokemon in DB
    dbPokemon = await Pokemon.findByPk(idPokemon, {
      include: {
        model: Type,
      },
    });

    if (dbPokemon) {
      // Pokemon exists in DB
      pokemon = {
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
    // GET pokemon from API
    try {
      const response = await axios.get(`${API_URL}/pokemon/${idPokemon}`);
      const apiPokemon = response.data;
      pokemon = {
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
  return pokemon;
};

module.exports = getPokemonByIdController;
