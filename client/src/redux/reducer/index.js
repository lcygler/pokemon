import { CLEAR_DETAIL, CREATE_POKEMON, GET_ALL, GET_BY_ID, GET_BY_NAME, GET_TYPES } from "../actions";

const initialState = {
  allPokemons: [],
  selectedPokemon: {},
  createdPokemon: {},
  types: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_DETAIL:
      return {
        ...state,
        selectedPokemon: {},
      };

    case CREATE_POKEMON:
      return {
        ...state,
        createdPokemon: action.payload,
      };

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

    default:
      return { ...state };
  }
};

export default rootReducer;
