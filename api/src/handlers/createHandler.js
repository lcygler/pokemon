const createController = require("../controllers/createController.js");
const validatePokemon = require("../utils/validators.js");

const createHandler = async (req, res) => {
  try {
    const { name, hp, attack, defense, speed, height, weight, image, types } = req.body;

    const newPokemon = {
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

    validatePokemon(newPokemon);

    const createdPokemon = await createController(newPokemon);

    res.status(200).json(createdPokemon);
  } catch (error) {
    if (error.message === "Required fields missing" || error.message === "Pokemon already exists") {
      res.status(404).json({ error: error.message });
    } else if (
      error.message === "Name and image must be strings" ||
      error.message === "Types must be strings" ||
      error.message === "Invalid type" ||
      error.message === "HP, attack, defense, speed, height and weight must be integers"
    ) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

module.exports = createHandler;
