import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_BY_ID = "GET_BY_ID";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_TYPES = "GET_TYPES";

export const CREATE_POKEMON = "CREATE_POKEMON";
export const CLEAR_DETAIL = "CLEAR_DETAIL";

export const FILTER_POKEMONS = "FILTER_POKEMONS";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_ATTACK = "SORT_BY_ATTACK";
export const RESET_FILTERS = "RESET_FILTERS";

export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/pokemons`);
      dispatch({
        type: GET_POKEMONS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/pokemons/${id}`);
      dispatch({
        type: GET_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/pokemons?name=${name}`);
      dispatch({
        type: GET_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/types`);

      const sortedTypes = response.data.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });

      dispatch({
        type: GET_TYPES,
        payload: sortedTypes,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const createPokemon = (newPokemon) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/pokemons`, newPokemon);
      dispatch({
        type: CREATE_POKEMON,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
  };
};

export const filterPokemons = () => {
  return {
    type: FILTER_POKEMONS,
  };
};

export const filterByType = (type) => {
  return {
    type: FILTER_BY_TYPE,
    payload: type,
  };
};

export const filterByOrigin = (origin) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
};

export const sortByName = (order) => {
  return {
    type: SORT_BY_NAME,
    payload: order,
  };
};

export const sortByAttack = (order) => {
  return {
    type: SORT_BY_ATTACK,
    payload: order,
  };
};

export const resetFilters = () => {
  return {
    type: RESET_FILTERS,
  };
};

export const setCurrentPage = (pageNumber) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: pageNumber,
  };
};
