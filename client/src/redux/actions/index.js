import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_BY_ID = "GET_BY_ID";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_TYPES = "GET_TYPES";

export const CREATE_POKEMON = "CREATE_POKEMON";
export const CLEAR_DETAIL = "CLEAR_DETAIL";

export const FILTER_POKEMONS = "FILTER_POKEMONS";
export const UPDATE_TYPE_FILTER = "UPDATE_TYPE_FILTER";
export const UPDATE_ORIGIN_FILTER = "UPDATE_ORIGIN_FILTER";
export const UPDATE_ORDER = "UPDATE_ORDER";
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

export const updateTypeFilter = (type) => {
  return {
    type: UPDATE_TYPE_FILTER,
    payload: type,
  };
};

export const updateOriginFilter = (origin) => {
  return {
    type: UPDATE_ORIGIN_FILTER,
    payload: origin,
  };
};

export const updateOrder = (order) => {
  return {
    type: UPDATE_ORDER,
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
