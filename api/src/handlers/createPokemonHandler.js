const createPokemonController = require("../controllers/createPokemonController.js");
const validatePokemon = require("../utils/validatePokemon.js");

const createPokemonHandler = async (req, res) => {
  try {
    const { name, hp, attack, defense, speed, height, weight, image, types } =
      req.body;

    const pokemon = {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      types,
    };

    validatePokemon(pokemon);

    const createdPokemon = await createPokemonController(pokemon);

    res.status(200).json(createdPokemon);
  } catch (error) {
    if (
      error.message === "Required parameters not found" ||
      error.message === "Pokemon already exists" ||
      error.message === "Type not found"
    ) {
      res.status(404).json({ error: error.message });
    } else if (
      error.message === "Name and Type must be strings" ||
      error.message ===
        "HP, Attack, Defense, Speed, Height, and Weight must be integers"
    ) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

module.exports = createPokemonHandler;
