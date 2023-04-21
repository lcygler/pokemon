const validatePokemon = (pokemon) => {
  const { name, hp, attack, defense, speed, height, weight, image, types } = pokemon;
  const filteredTypes = types.filter(Boolean);

  //* Validate required fields
  if (![name, hp, attack, defense, image, types].every(Boolean)) {
    throw new Error("Required fields missing");
  }

  //* Validate strings
  if (typeof name !== "string" || typeof image !== "string") {
    throw new Error("Name and image must be strings");
  }

  for (element of filteredTypes) {
    if (typeof element !== "string") {
      throw new Error("Types must be strings");
    }
  }

  //* Validate integers
  if (
    !Number.isInteger(hp) ||
    !Number.isInteger(attack) ||
    !Number.isInteger(defense) ||
    !Number.isInteger(speed) ||
    !Number.isInteger(height) ||
    !Number.isInteger(weight)
  ) {
    throw new Error("HP, attack, defense, speed, height, and weight must be integers");
  }
};

module.exports = validatePokemon;
