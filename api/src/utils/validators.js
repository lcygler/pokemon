const validatePokemon = (newPokemon) => {
  const { name, hp, attack, defense, speed, height, weight, image, types } = newPokemon;
  const filteredTypes = types.filter(Boolean);

  //* Required fields
  if (![name, hp, attack, defense, image, types].every(Boolean)) {
    throw new Error("Required fields missing");
  }

  //* DataType String
  if (typeof name !== "string" || typeof image !== "string") {
    throw new Error("Name and image must be strings");
  }

  for (element of filteredTypes) {
    if (typeof element !== "string") {
      throw new Error("Types must be strings");
    }
  }

  //* DataType Integer
  if (
    !Number.isInteger(hp) ||
    !Number.isInteger(attack) ||
    !Number.isInteger(defense) ||
    !Number.isInteger(speed) ||
    !Number.isInteger(height) ||
    !Number.isInteger(weight)
  ) {
    throw new Error("HP, attack, defense, speed, height and weight must be integers");
  }
};

module.exports = validatePokemon;
