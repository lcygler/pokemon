const patchController = require("../controllers/patchController.js");
const { validateUpdate } = require("../utils/validators.js");

const patchHandler = async (req, res) => {
  try {
    const { idPokemon } = req.params;
    const pokemon = req.body;
    validateUpdate(idPokemon, pokemon);
    const updatedPokemon = await patchController(idPokemon, pokemon);
    res.status(200).json(updatedPokemon);
  } catch (error) {
    if (error.message === "At least one field is required") {
      res.status(404).json({ error: error.message });
    } else if (
      error.message === "Invalid ID" ||
      error.message === "Invalid type" ||
      error.message === "Pokemon not found" ||
      error.message === "Name already in use" ||
      error.message === "Name and image must be strings" ||
      error.message === "Image must be a valid URL" ||
      error.message === "HP, attack, defense, speed, height and weight must be integers" ||
      error.message === "Types must be strings"
    ) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

module.exports = patchHandler;
