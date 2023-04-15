const { Router } = require("express");

const getPokemonsHandler = require("../handlers/getPokemonsHandler");
const getPokemonByIdHandler = require("../handlers/getPokemonByIdHandler");
const createPokemonHandler = require("../handlers/createPokemonHandler");

const pokemonsRouter = Router();

pokemonsRouter.get("/", getPokemonsHandler);

pokemonsRouter.get("/:idPokemon", getPokemonByIdHandler);

pokemonsRouter.post("/", createPokemonHandler);

module.exports = pokemonsRouter;
