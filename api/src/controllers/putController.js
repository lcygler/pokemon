const { Pokemon, Type } = require("../db.js");
const uuid = require("uuid");

const putUpdate = async (idPokemon, pokemon) => {
  const { name, hp, attack, defense, speed, height, weight, image, types } = pokemon;
  const pokemonName = name?.trim().toLowerCase();
  const pokemonTypes = types?.filter(Boolean).map((element) => element.trim().toLowerCase());
  const isUuid = uuid.validate(idPokemon);
  let dbPokemon;

  //* Check UUID
  if (!isUuid) {
    throw new Error("Invalid ID");
  }

  //* Find pokemon
  dbPokemon = await Pokemon.findByPk(idPokemon);

  if (!dbPokemon) {
    throw new Error("Pokemon not found");
  }

  //* Update types
  const existingTypes = await Type.findAll({
    where: {
      name: pokemonTypes,
    },
  });

  if (existingTypes.length !== pokemonTypes.length) {
    throw new Error("Invalid type");
  }

  await dbPokemon.setTypes([]);
  await dbPokemon.addTypes(existingTypes);

  //* Update pokemon
  const pokemonUpdate = {
    name: pokemonName,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    image,
  };

  await dbPokemon.update(pokemonUpdate);

  //* Return updated pokemon
  const updatedPokemon = await Pokemon.findOne({
    where: {
      id: dbPokemon.id,
    },
    include: {
      model: Type,
    },
  });

  return {
    id: updatedPokemon.id,
    name: updatedPokemon.name,
    hp: updatedPokemon.hp,
    attack: updatedPokemon.attack,
    defense: updatedPokemon.defense,
    speed: updatedPokemon.speed,
    height: updatedPokemon.height,
    weight: updatedPokemon.weight,
    image: updatedPokemon.image,
    types: updatedPokemon.types.map((element) => element.name),
  };
};

module.exports = putUpdate;
