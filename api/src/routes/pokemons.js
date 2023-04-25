const { Router } = require("express");

const getAllHandler = require("../handlers/getAllHandler.js");
const getByIdHandler = require("../handlers/getByIdHandler.js");
const getByNameHandler = require("../handlers/getByNameHandler.js");
const createHandler = require("../handlers/createHandler.js");
const deleteHandler = require("../handlers/deleteHandler.js");

const router = Router();

router.get("/", getByNameHandler, getAllHandler);

router.get("/:idPokemon", getByIdHandler);

router.post("/", createHandler);

router.delete("/:idOrName", deleteHandler);

module.exports = router;
