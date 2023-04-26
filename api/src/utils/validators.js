const { urlRegex } = require("./consts");
const uuid = require("uuid");

const createValidate = (pokemon) => {
  const { name, hp, attack, defense, speed, height, weight, image, types } = pokemon;
  const filteredTypes = types?.filter(Boolean);

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
    (speed && !Number.isInteger(speed)) ||
    (height && !Number.isInteger(height)) ||
    (weight && !Number.isInteger(weight))
  ) {
    throw new Error("HP, attack, defense, speed, height and weight must be integers");
  }

  //* Image
  if (!urlRegex.test(image)) {
    throw new Error("Image must be a valid URL");
  }
};

const patchValidate = (idPokemon, pokemon) => {
  const { name, hp, attack, defense, speed, height, weight, image, types } = pokemon;
  const filteredTypes = types?.filter(Boolean);
  const isUuid = uuid.validate(idPokemon);

  //* Check for non-empty fields
  if (![name, hp, attack, defense, speed, height, weight, image, types].some(Boolean)) {
    throw new Error("At least one field is required");
  }

  //* DataType String
  if ((name && typeof name !== "string") || (image && typeof image !== "string")) {
    throw new Error("Name and image must be strings");
  }

  if (types) {
    for (element of filteredTypes) {
      if (typeof element !== "string") {
        throw new Error("Types must be strings");
      }
    }
  }

  //* DataType Integer
  if (
    (hp && !Number.isInteger(hp)) ||
    (attack && !Number.isInteger(attack)) ||
    (defense && !Number.isInteger(defense)) ||
    (speed && !Number.isInteger(speed)) ||
    (height && !Number.isInteger(height)) ||
    (weight && !Number.isInteger(weight))
  ) {
    throw new Error("HP, attack, defense, speed, height and weight must be integers");
  }

  //* UUID
  if (!isUuid) {
    throw new Error("Invalid ID");
  }

  //* Image
  if (image && !urlRegex.test(image)) {
    throw new Error("Image must be a valid URL");
  }
};

module.exports = { createValidate, patchValidate };
