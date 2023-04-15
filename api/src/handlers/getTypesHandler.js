const getTypes = require("../controllers/getTypes.js");

const getTypesHandler = async (req, res) => {
  try {
    const types = await getTypes();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = getTypesHandler;
