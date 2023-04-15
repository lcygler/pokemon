const createController = require("../controllers/createController.js");
const validate = require("../utils/validate.js");

const createHandler = async (req, res) => {
  try {
    const { name, hp, attack, defense, speed, height, weight, image, types } = req.body;

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

    validate(pokemon);

    const createdPokemon = await createController(pokemon);

    res.status(200).json(createdPokemon);
  } catch (error) {
    if (
      error.message === "Required parameters not found" ||
      error.message === "Pokemon already exists" ||
      error.message === "Invalid type"
    ) {
      res.status(404).json({ error: error.message });
    } else if (
      error.message === "Name and type must be strings" ||
      error.message === "HP, attack, defense, speed, height, and weight must be integers"
    ) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

module.exports = createHandler;
