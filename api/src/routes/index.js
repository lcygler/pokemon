const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getPokemons = require("../controllers/getPokemons");
const getPokemonById = require("../controllers/getPokemonById");
const getPokemonByName = require("../controllers/getPokemonByName");
const createPokemon = require("../controllers/createPokemon");
const getTypes = require("../controllers/getTypes");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons/:idPokemon", getPokemonById);
router.get("/pokemons", getPokemonByName);
router.get("/pokemons", getPokemons);
router.get("/types", getTypes);
router.post("/pokemons", createPokemon);

module.exports = router;
