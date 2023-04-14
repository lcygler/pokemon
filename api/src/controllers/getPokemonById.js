const { API_URL } = require("../utils/consts.js");
const { Pokemon, Type } = require("../db.js");
const axios = require("axios");
const uuid = require("uuid");

const getPokemonById = async (req, res) => {
  try {
    const { idPokemon } = req.params;
    const isUuid = uuid.validate(idPokemon);

    let dbPokemon;
    if (isUuid) {
      dbPokemon = await Pokemon.findByPk(idPokemon, {
        include: Type,
      });
    }

    let pokemon;
    if (dbPokemon) {
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
    }

    res.status(200).json(pokemon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getPokemonById;
