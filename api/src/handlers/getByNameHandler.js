const getByNameController = require("../controllers/getByNameController.js");

const getByNameHandler = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (name) {
      const pokemonName = name.trim().toLowerCase();
      const pokemon = await getByNameController(pokemonName);
      res.status(200).json(pokemon);
    } else {
      next();
    }
  } catch (error) {
    if (error.message === "Pokemon not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

module.exports = getByNameHandler;
