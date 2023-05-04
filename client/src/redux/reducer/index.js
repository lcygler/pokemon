import {
  CLEAR_DETAIL,
  CREATE_POKEMON,
  FILTER_BY_ORIGIN,
  FILTER_BY_TYPE,
  FILTER_POKEMONS,
  GET_BY_ID,
  GET_BY_NAME,
  GET_POKEMONS,
  GET_TYPES,
  RESET_FILTERS,
  SORT_BY_ATTACK,
  SORT_BY_NAME,
} from "../actions";

import { filterByOrigin, filterByType, sortByAttack, sortByName } from "./helpers";

const initialState = {
  allPokemons: [],
  filteredPokemons: [],
  selectedPokemon: {},
  types: [],
  typeFilter: "All",
  originFilter: "All",
  nameOrder: "Default",
  attackOrder: "Default",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
      };

    case GET_BY_ID:
      return {
        ...state,
        selectedPokemon: action.payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        selectedPokemon: action.payload,
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case CREATE_POKEMON:
      return {
        ...state,
        selectedPokemon: action.payload,
      };

    case CLEAR_DETAIL:
      return {
        ...state,
        selectedPokemon: {},
      };

    // prettier-ignore
    case FILTER_POKEMONS:
      const pokemonsCopy = [...state.allPokemons];

      const filteredPokemons = filterByType(
        filterByOrigin(pokemonsCopy, state.originFilter),
        state.typeFilter
      );

      const sortedPokemons = sortByName(
        sortByAttack(filteredPokemons, state.attackOrder),
        state.nameOrder
      );

      return {
        ...state,
        filteredPokemons: sortedPokemons,
      };

    // prettier-ignore
    case FILTER_BY_TYPE:
      const pokemonsTypeCopy = [...state.allPokemons];

      const filteredByType = filterByType(
        filterByOrigin(pokemonsTypeCopy, state.originFilter),
        action.payload
      );

      const sortedType = sortByName(
        sortByAttack(filteredByType, state.attackOrder),
        state.nameOrder
      );

      return {
        ...state,
        filteredPokemons: sortedType,
        typeFilter: action.payload,
      };

    // prettier-ignore
    case FILTER_BY_ORIGIN:
      const pokemonsOriginCopy = [...state.allPokemons];

      const filteredByOrigin = filterByOrigin(
        filterByType(pokemonsOriginCopy, state.typeFilter),
        action.payload
      );

      const sortedOrigin = sortByName(
        sortByAttack(filteredByOrigin, state.attackOrder),
        state.nameOrder
      );

      return {
        ...state,
        filteredPokemons: sortedOrigin,
        originFilter: action.payload,
      };

    // prettier-ignore
    case SORT_BY_NAME:
      const pokemonsNameCopy = [...state.allPokemons];
      const sortedByName = sortByName(pokemonsNameCopy, action.payload);

      const filteredName = filterByType(
        filterByOrigin(sortedByName, state.originFilter),
        state.typeFilter
      );

      return {
        ...state,
        filteredPokemons: filteredName,
        nameOrder: action.payload,
        attackOrder: "Default",
      };

    // prettier-ignore
    case SORT_BY_ATTACK:
      const pokemonsAttackCopy = [...state.allPokemons];
      const sortedByAttack = sortByAttack(pokemonsAttackCopy, action.payload);

      const filteredAttack = filterByType(
        filterByOrigin(sortedByAttack, state.originFilter),
        state.typeFilter
      );

      return {
        ...state,
        filteredPokemons: filteredAttack,
        attackOrder: action.payload,
        nameOrder: "Default",
      };

    case RESET_FILTERS:
      return {
        ...state,
        filteredPokemons: state.allPokemons,
        typeFilter: "All",
        originFilter: "All",
        nameOrder: "Default",
        attackOrder: "Default",
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
