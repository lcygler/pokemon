const { Pokemon } = require("../db.js");
const uuid = require("uuid");

const deleteController = async (idOrName) => {
  const isUuid = uuid.validate(idOrName);
  let dbPokemon, deletedPokemon;

  if (isUuid) {
    //* Delete by UUID
    dbPokemon = await Pokemon.findByPk(idOrName);

    if (dbPokemon) {
      deletedPokemon = { ...dbPokemon.dataValues };
      await dbPokemon.destroy();
      return deletedPokemon;
    } else {
      throw new Error("Pokemon not found");
    }
  } else if (typeof idOrName === "string") {
    //* Delete by Name
    const formattedName = idOrName.trim().toLowerCase();

    dbPokemon = await Pokemon.findOne({
      where: {
        name: formattedName,
      },
    });

    if (dbPokemon) {
      deletedPokemon = { ...dbPokemon.dataValues };
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
