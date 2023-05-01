const getPokemonsController = require("../controllers/getPokemonsController.js");

const getPokemonsHandler = async (req, res) => {
  try {
    const pokemons = await getPokemonsController();
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = getPokemonsHandler;
