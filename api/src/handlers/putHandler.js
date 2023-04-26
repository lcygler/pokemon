const putController = require("../controllers/putController.js");
const { createValidate } = require("../utils/validators.js");

const putHandler = async (req, res) => {
  try {
    const { idPokemon } = req.params;
    const pokemon = req.body;
    createValidate(pokemon);
    const updatedPokemon = await putController(idPokemon, pokemon);
    res.status(200).json(updatedPokemon);
  } catch (error) {
    if (error.message === "Required fields missing") {
      res.status(404).json({ error: error.message });
    } else if (
      error.message === "Invalid ID" ||
      error.message === "Pokemon not found" ||
      error.message === "Name and image must be strings" ||
      error.message === "Image must be a valid URL" ||
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

module.exports = putHandler;
