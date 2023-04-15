const getAllController = require("../controllers/getAllController.js");

const getAllHandler = async (req, res) => {
  try {
    const pokemons = await getAllController();
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = getAllHandler;
