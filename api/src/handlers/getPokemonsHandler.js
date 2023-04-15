const getPokemonByName = require("../controllers/getPokemonByName.js");
const getAllPokemons = require("../controllers/getAllPokemons.js");

const getPokemonsHandler = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      // Request has query parameter
      const pokemonName = name.trim().toLowerCase();
      const pokemon = await getPokemonByName(pokemonName);
      res.status(200).json(pokemon);
    } else {
      // Request has no query parameter
      const pokemons = await getAllPokemons();
      res.status(200).json(pokemons);
    }
  } catch (error) {
    if (error.message === "Pokemon not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

module.exports = getPokemonsHandler;
