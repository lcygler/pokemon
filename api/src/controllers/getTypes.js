const { API_URL } = require("../utils/consts.js");
const { Type } = require("../db.js");
const axios = require("axios");

const getTypes = async (req, res) => {
  try {
    let types = await Type.findAll();

    if (types.length === 0) {
      const response = await axios.get(`${API_URL}/type`);
      const apiTypes = response.data.results;

      types = await Promise.all(
        apiTypes.map(async (element) => {
          const response = await axios.get(element.url);
          return {
            id: response.data.id,
            name: response.data.name,
          };
        })
      );

      await Type.bulkCreate(types);
    }

    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getTypes;
