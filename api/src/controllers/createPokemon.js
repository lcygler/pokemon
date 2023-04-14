const { Pokemon, Type } = require("../db.js");

const validate = async (req) => {
  const { name, hp, attack, defense, speed, height, weight, image, types } =
    req.body;

  // Validate required parameters
  if (![name, hp, attack, defense, image, types].every(Boolean)) {
    throw new Error("Required parameters not found");
  }

  // Validate strings
  if (
    typeof name !== "string" ||
    typeof image !== "string" ||
    typeof types[0] !== "string" ||
    typeof types[1] !== "string"
  ) {
    throw new Error("Name and Type must be strings");
  }

  // Validate integers
  if (
    !Number.isInteger(hp) ||
    !Number.isInteger(attack) ||
    !Number.isInteger(defense) ||
    !Number.isInteger(speed) ||
    !Number.isInteger(height) ||
    !Number.isInteger(weight)
  ) {
    throw new Error(
      "HP, Attack, Defense, Speed, Height, and Weight must be integers"
    );
  }
};

const createPokemon = async (req, res) => {
  try {
    validate(req);

    const { name, hp, attack, defense, speed, height, weight, image, types } =
      req.body;

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

    res.status(200).json(createdPokemon);
  } catch (error) {
    // Error handling
    if (
      error.message === "Required parameters not found" ||
      error.message === "Pokemon already exists" ||
      error.message === "Type not found"
    ) {
      res.status(404).json({ error: error.message });
    } else if (
      error.message === "Name and Type must be strings" ||
      error.message ===
        "HP, Attack, Defense, Speed, Height, and Weight must be integers"
    ) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

module.exports = createPokemon;
