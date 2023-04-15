const { Router } = require("express");

const getAllHandler = require("../handlers/getAllHandler.js");
const getByIdHandler = require("../handlers/getByIdHandler.js");
const getByNameHandler = require("../handlers/getByNameHandler.js");
const createHandler = require("../handlers/createHandler.js");

const router = Router();

router.get("/", getByNameHandler, getAllHandler);

router.get("/:idPokemon", getByIdHandler);

router.post("/", createHandler);

module.exports = router;
