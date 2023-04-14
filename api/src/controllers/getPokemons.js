const { API_URL } = require("../utils/consts.js");
const { Pokemon, Type } = require("../db.js");
const axios = require("axios");

const getPokemons = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      // Request has query parameter
      const pokemonName = name.trim().toLowerCase();

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
        return res.status(200).json(dbPokemon);
      }

      // GET pokemon from API
      let pokemon;
      try {
        const response = await axios.get(`${API_URL}/pokemon/${pokemonName}`);
        pokemon = {
          id: response.data.id,
          name: response.data.name,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          speed: response.data.stats[5].base_stat,
          height: response.data.height,
          weight: response.data.weight,
          image:
            response.data.sprites.other["official-artwork"]["front_default"],
          types: response.data.types.map((element) => element.type.name),
        };
      } catch (error) {
        throw new Error("Pokemon not found");
      }

      res.status(200).json(pokemon);
    } else {
      // Request has no query parameter
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
            image:
              response.data.sprites.other["official-artwork"]["front_default"],
            types: response.data.types.map((element) => element.type.name),
          };
        })
      );

      const dbPokemons = await Pokemon.findAll();
      const allPokemons = [...dbPokemons, ...apiPokemons];

      res.status(200).json(allPokemons);
    }
  } catch (error) {
    // Error handling
    if (error.message === "Pokemon not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

module.exports = getPokemons;
