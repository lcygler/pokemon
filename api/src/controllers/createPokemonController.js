const { Pokemon, Type } = require("../db.js");

const createPokemonController = async (pokemon) => {
  const { name, hp, attack, defense, speed, height, weight, image, types } =
    pokemon;

  const pokemonName = name.trim().toLowerCase();

  // Search pokemon in DB
  let dbPokemon = await Pokemon.findOne({ where: { name: pokemonName } });
  if (dbPokemon) {
    throw new Error("Pokemon already exists");
  }

  const pokemonTypes = types.map((element) => element.trim().toLowerCase());

  // Search types in DB
  const existingTypes = await Type.findAll({
    where: {
      name: pokemonTypes,
    },
  });

  if (existingTypes.length !== pokemonTypes.length) {
    throw new Error("Type not found");
  }

  // Create pokemon in DB
  const newPokemon = await Pokemon.create({
    name: pokemonName,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    image,
  });

  await newPokemon.addTypes(existingTypes);

  const createdPokemon = await Pokemon.findOne({
    where: {
      id: newPokemon.id,
    },
    include: {
      model: Type,
    },
  });

  return createdPokemon;
};

module.exports = createPokemonController;
