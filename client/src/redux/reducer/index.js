import {
  CLEAR_DETAIL,
  CREATE_POKEMON,
  FILTER_BY_ORIGIN,
  FILTER_BY_TYPE,
  GET_ALL,
  GET_BY_ID,
  GET_BY_NAME,
  GET_TYPES,
  ORDER_BY_ATTACK,
  ORDER_BY_NAME,
} from "../actions";

const initialState = {
  allPokemons: [],
  selectedPokemon: {},
  types: [],
  typeFilter: "All",
  originFilter: "All",
  idOrder: "Default",
  attackOrder: "Default",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL:
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

    //* Filter and Order
    case FILTER_BY_ORIGIN:
      return {
        ...state,
        //
      };

    case FILTER_BY_TYPE:
      return {
        ...state,
        //
      };

    case ORDER_BY_ATTACK:
      return {
        ...state,
        //
      };

    case ORDER_BY_NAME:
      return {
        ...state,
        //
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
