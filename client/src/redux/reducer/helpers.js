import { uuidRegex } from "../../utils/consts";

export const filterByType = (pokemons, type) => {
  if (type !== "All") {
    return pokemons.filter((pokemon) => pokemon.types.includes(type));
  } else {
    return pokemons;
  }
};

export const filterByOrigin = (pokemons, origin) => {
  switch (origin) {
    case "API":
      return pokemons.filter((pokemon) => !uuidRegex.test(pokemon.id));

    case "Database":
      return pokemons.filter((pokemon) => uuidRegex.test(pokemon.id));

    default:
      return pokemons;
  }
};

export const sortPokemons = (pokemons, order) => {
  switch (order) {
    case "Name (A-Z)":
      return pokemons.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });

    case "Name (Z-A)":
      return pokemons.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        } else if (a.name > b.name) {
          return -1;
        } else {
          return 0;
        }
      });

    case "Attack (Asc)":
      return pokemons.sort((a, b) => {
        if (a.attack < b.attack) {
          return -1;
        } else if (a.attack > b.attack) {
          return 1;
        } else {
          return 0;
        }
      });

    case "Attack (Desc)":
      return pokemons.sort((a, b) => {
        if (a.attack < b.attack) {
          return 1;
        } else if (a.attack > b.attack) {
          return -1;
        } else {
          return 0;
        }
      });

    default:
      return pokemons;
  }
};
