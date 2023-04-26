const { Router } = require("express");

const getAllHandler = require("../handlers/getAllHandler.js");
const getByIdHandler = require("../handlers/getByIdHandler.js");
const getByNameHandler = require("../handlers/getByNameHandler.js");
const createHandler = require("../handlers/createHandler.js");
const deleteHandler = require("../handlers/deleteHandler.js");
const patchHandler = require("../handlers/patchHandler.js");
const putHandler = require("../handlers/putHandler.js");

const router = Router();

router.get("/", getByNameHandler, getAllHandler);

router.get("/:idPokemon", getByIdHandler);

router.post("/", createHandler);

router.put("/:idPokemon", putHandler);

router.patch("/:idPokemon", patchHandler);

router.delete("/:idOrName", deleteHandler);

module.exports = router;
