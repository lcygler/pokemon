const { Pokemon } = require("../db.js");
const uuid = require("uuid");

const deleteController = async (idOrName) => {
  const isUuid = uuid.validate(idOrName);
  let dbPokemon, deletedPokemon;

  if (isUuid) {
    dbPokemon = await Pokemon.findByPk(idOrName);

    if (dbPokemon) {
      deletedPokemon = { ...dbPokemon };
      await dbPokemon.destroy();
      return deletedPokemon;
    } else {
      throw new Error("Pokemon not found");
    }
  } else if (typeof idOrName === "string") {
    const formattedName = idOrName.trim().toLowerCase();

    dbPokemon = await Pokemon.findOne({
      where: {
        name: formattedName,
      },
    });

    if (dbPokemon) {
      deletedPokemon = { ...dbPokemon };
      await dbPokemon.destroy();
      return deletedPokemon;
    } else {
      throw new Error("Pokemon not found");
    }
  } else {
    throw new Error("Invalid ID or name");
  }
};

module.exports = deleteController;
