import axios from "axios";
import { API_URL } from "../../utils/consts";

export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_ALL = "GET_ALL";
export const GET_BY_ID = "GET_BY_ID";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_TYPES = "GET_TYPES";

export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
  };
};

export const createPokemon = (pokemon) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/pokemons`, pokemon);
      dispatch({
        type: CREATE_POKEMON,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

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
      dispatch({
        type: GET_TYPES,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
