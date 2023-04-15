const validatePokemon = (pokemon) => {
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

module.exports = validatePokemon;
