import { CLEAR_DETAIL, GET_ALL, GET_BY_ID, GET_BY_NAME, GET_TYPES } from "../actions";

const initialState = {
  allPokemons: [],
  selectedPokemon: {},
  types: [],
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

    case CLEAR_DETAIL:
      return {
        ...state,
        selectedPokemon: {},
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
