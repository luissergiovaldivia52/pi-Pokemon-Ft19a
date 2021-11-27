const { Pokemon, Type, Op } = require("../db");

const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { types } = require("pg");



async function getPokemon(req, res, next) {
  try {
    let { name, order, filter, page, paisXPage } = req.query;

    //orden pag /filtrado name
    //name
    //orden
    //pag
    //pasiXPage
    let result;

    let apiPokemon = [];
    let apiPokemonNext = [];
    let dbPokemon;
    let allPokemons = [];

    let correccion = paisXPage != 12 ? 0 : 3;
    page = page ? page : 1;
    paisXPage = paisXPage ? paisXPage : 9;

    paisXPage = Number(paisXPage);
    correccion = Number(correccion);
    page = Number(page);

    //#region NAME

    if (name && name !== "") {
      apiPokemon = (
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      ).data;

      console.log("api con name " + apiPokemon.name);

      let obj = { name: apiPokemon.name };

      obj.id = apiPokemon.id;

      let arrayType = apiPokemon.types;
      let types = [];

      for (let i = 0; i < arrayType.length; i++) {
        types.push(arrayType[i].type.name);
        obj.type = types;
      }

      obj.imagen = apiPokemon.sprites.other.home.front_default;

      allPokemons.push(obj);

      if (!apiPokemon) {
        dbPokemon = await Pokemon.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
        });
        allPokemons = apiPokemon.concat(dbPokemon);
      } else {
        allPokemons = allPokemons;
      }
    } else {
      apiPokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon`));
      apiPokemon = apiPokemon.data
      if (paisXPage > 10 && page > 1) {
        console.log("este es el if del next ");
        apiPokemonNext = (await axios.get(apiPokemon.next)).data.results;
      }

      apiPokemon = apiPokemon.results;

      apiPokemon = apiPokemon.concat(apiPokemonNext);

      dbPokemon = await Pokemon.findAll({ include: Type });

    /*  await Promise.all(*/
        apiPokemon.map(async (e) => {
          let obj = { name: e.name };

          let apiAbilities = (await axios.get(e.url)).data;
          obj.id = apiAbilities.id;

          let arrayType = apiAbilities.types;
          let types = [];
          arrayType.map((env) => {
            types.push(env.type.name);
            obj.type = types;
          });

          let apiUrlForm = apiAbilities.forms[0].url;

          let apiForm = (await axios.get(apiUrlForm)).data;

          obj.imagen = apiAbilities.sprites.other.home.front_default;

          allPokemons.push(obj);
        })
     /* );*/
      allPokemons = allPokemons.concat(dbPokemon);
      //#endregion

      //#region ORDER mejoprar el ordenamiento

      if (order === "lowest") {
        if (filter === "Pokemons") {
          allPokemons = allPokemons.sort((a, b) => {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
          });
        }
        if (filter === "Type") {
          allPokemoms = allPokemons.sort((a, b) => {
            return a.type[0]
              .toLowerCase()
              .localeCompare(b.type[0].toLowerCase());
          });
        }
      } else {
        if (order === "highest") {
          if (filter === "Pokemons") {
            allPokemons = allPokemons.sort((a, b) => {
              return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
            });
          }
          s;

          if (filter === "Type") {
            allPokemons = allPokemons.sort((a, b) => {
              return b.type[0]
                .toLowerCase()
                .localeCompare(a.type[0].toLowerCase());
            });
          }
        }
      }
    }
    //#endregion

    //#region PAGE
    //result = allPokemons

    result = allPokemons.slice(
      paisXPage * (page - 1) - correccion,
      paisXPage * (page - 1) + paisXPage - correccion
    );

    return res.send({
      result: result,
      count: result.length,
    });
  } catch (error) {
    next(error);
  }
}

const addPokemon = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, life, strength, defense, speed, height, weight, types } =
      req.body;

    let pokemon = {
      name,
      life,
      strength,
      defense,
      speed,
      height,
      weight,
    };

    let type = {
      name,
    };
    type.name = types;

    const tempPokemon = await Pokemon.create(pokemon);
    const tempType = await Type.create(type);
    await tempPokemon.addType(tempType, { through: { selfGranted: false } });
    const result = await Pokemon.findOne({
      where: { name: pokemon.name },
      include: Type,
    });

    let bar = await Type.findOne({
      where: {
        name: type.name,
      },
    });

    const foo = await Pokemon.findOne({ where: { name: pokemon.name } });

    res.json({ ...foo, bar });
  } catch (error) {
    next(error);
  }
};

async function getPokemonById(req, res, next) {
  try {
    let allPokemons = [];
    let dbPokemon;
 

    const { id } = req.params;
    let pokemon;
    if (isNaN(id)) {
      pokemon = await Pokemon.findByPk(id);
    } else {
      pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      pokemon = pokemon.data;
    }

    console.log("api con name " + pokemon.name);

      let obj = { name: pokemon.name };

      obj.id = pokemon.id;
      obj.height = pokemon.height;
      obj.weight = pokemon.weight;
      obj.hp = pokemon.stats[0].base_stat;
      obj.strength = pokemon.stats[1].base_stat;
      obj.defense = pokemon.stats[2].base_stat;
      obj.speed = pokemon.stats[5].base_stat;
      

      let arrayType = pokemon.types;
      let types = [];

      for (let i = 0; i < arrayType.length; i++) {
        types.push(arrayType[i].type.name);
        obj.type = types;
      }

      obj.imagen = pokemon.sprites.other.home.front_default;

      allPokemons.push(obj);
     
      
        dbPokemon = await Pokemon.findAll({
          where: {
            name: {
              [Op.iLike]: `%${id}%`,
            },
          },
        });
        
     
        allPokemons = allPokemons.concat(dbPokemon);


   
    return res.json(allPokemons)
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPokemon,
  getPokemonById,
  // preCountry,
  addPokemon,
};

//est es un nuevo intento