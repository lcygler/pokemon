const getByIdController = require("../controllers/getByIdController.js");

const getByIdHandler = async (req, res) => {
  try {
    const { idPokemon } = req.params;
    const pokemon = await getByIdController(idPokemon);
    res.status(200).json(pokemon);
  } catch (error) {
    if (error.message === "Pokemon not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

module.exports = getByIdHandler;
