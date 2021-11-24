const {Router} = require('express');
const router = Router();
const { getPokemon, getPokemonById, addPokemon } = require("../Controller/pokemonController");





router.get("/", getPokemon)
router.get("/:id", getPokemonById)
router.post("/", addPokemon)

module.exports = router;
