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
  UPDATE_ORDER,
  UPDATE_ORIGIN_FILTER,
  UPDATE_TYPE_FILTER,
} from "../actions";

import { filterByOrigin, filterByType, sortPokemons } from "./helpers";

const initialState = {
  allPokemons: [],
  filteredPokemons: [],
  selectedPokemon: {},
  types: [],
  typeFilter: "All",
  originFilter: "All",
  order: "Default",
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

      if (state.order !== "Default") {
        filteredSorted = sortPokemons(filteredSorted, state.order);
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

    case UPDATE_ORDER:
      return {
        ...state,
        order: action.payload,
      };

    case RESET_FILTERS:
      return {
        ...state,
        typeFilter: "All",
        originFilter: "All",
        order: "Default",
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
