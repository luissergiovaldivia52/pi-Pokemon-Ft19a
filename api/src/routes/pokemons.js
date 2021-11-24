const {Router} = require('express');
const router = Router();
const {getPokemon, getPokemonById} = require("../Controller/pokemonController");





router.get("/", getPokemon)
router.get("/:id", getPokemonById)


module.exports = router;
