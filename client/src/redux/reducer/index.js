import {
  CLEAR_DETAIL,
  CREATE_POKEMON,
  FILTER_POKEMONS,
  GET_BY_ID,
  GET_BY_NAME,
  GET_POKEMONS,
  GET_TYPES,
  RESET_FILTERS,
  SET_CURRENT_PAGE,
  UPDATE_ATTACK_ORDER,
  UPDATE_NAME_ORDER,
  UPDATE_ORIGIN_FILTER,
  UPDATE_TYPE_FILTER,
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
  currentPage: 1,
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

    case FILTER_POKEMONS:
      let filteredSorted = [...state.allPokemons];

      if (state.typeFilter !== "All") {
        filteredSorted = filterByType(filteredSorted, state.typeFilter);
      }

      if (state.originFilter !== "All") {
        filteredSorted = filterByOrigin(filteredSorted, state.originFilter);
      }

      if (state.attackOrder !== "Default") {
        filteredSorted = sortByAttack(filteredSorted, state.attackOrder);
      }

      if (state.nameOrder !== "Default") {
        filteredSorted = sortByName(filteredSorted, state.nameOrder);
      }

      return {
        ...state,
        filteredPokemons: filteredSorted,
      };

    case UPDATE_TYPE_FILTER:
      return {
        ...state,
        typeFilter: action.payload,
      };

    case UPDATE_ORIGIN_FILTER:
      return {
        ...state,
        originFilter: action.payload,
      };

    case UPDATE_NAME_ORDER:
      return {
        ...state,
        nameOrder: action.payload,
        attackOrder: "Default",
      };

    case UPDATE_ATTACK_ORDER:
      return {
        ...state,
        attackOrder: action.payload,
        nameOrder: "Default",
      };

    case RESET_FILTERS:
      return {
        ...state,
        typeFilter: "All",
        originFilter: "All",
        nameOrder: "Default",
        attackOrder: "Default",
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
