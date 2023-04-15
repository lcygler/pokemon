const createPokemonController = require("../controllers/createPokemonController.js");

const validate = (pokemon) => {
  const { name, hp, attack, defense, speed, height, weight, image, types } =
    pokemon;

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

const createPokemonHandler = async (req, res) => {
  try {
    const { name, hp, attack, defense, speed, height, weight, image, types } =
      req.body;

    const pokemon = {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      types,
    };

    validate(pokemon);

    const createdPokemon = await createPokemonController(pokemon);

    res.status(200).json(createdPokemon);
  } catch (error) {
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

module.exports = createPokemonHandler;
