import axios from "axios";
import { API_URL } from "../../utils/consts";

export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const GET_ALL = "GET_ALL";
export const GET_BY_ID = "GET_BY_ID";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_TYPES = "GET_TYPES";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const RESET_FILTERS = "RESET_FILTERS";

export const getAll = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/pokemons`);
      dispatch({
        type: GET_ALL,
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

//* Filter and Order
export const filterByOrigin = (origin) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
};

export const filterByType = (type) => {
  return {
    type: FILTER_BY_TYPE,
    payload: type,
  };
};

export const orderByAttack = (attack) => {
  return {
    type: ORDER_BY_ATTACK,
    payload: attack,
  };
};

export const orderByName = (name) => {
  return {
    type: ORDER_BY_NAME,
    payload: name,
  };
};

export const resetFilters = () => {
  return {
    type: RESET_FILTERS,
  };
};
