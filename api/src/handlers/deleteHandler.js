const deleteController = require("../controllers/deleteController.js");

const deleteHandler = async (req, res) => {
  try {
    const { idOrName } = req.params;
    const deletedPokemon = await deleteController(idOrName);
    res.status(200).json(deletedPokemon);
  } catch (error) {
    if (error.message === "Invalid ID or name") {
      res.status(400).json({ error: error.message });
    } else if (error.message === "Pokemon not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

module.exports = deleteHandler;
