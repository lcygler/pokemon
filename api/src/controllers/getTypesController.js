const { API_URL } = require("../utils/consts.js");
const { Type } = require("../db.js");
const axios = require("axios");

const getTypes = async () => {
  //* Search types
  let types = await Type.findAll();

  if (types.length === 0) {
    //* GET types from API
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

    //* Add types
    await Type.bulkCreate(types);
  }

  return types;
};

module.exports = getTypes;
