const { Pokemon, Type, pokemons_types, Op } = require("../db");

const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { types } = require("pg");

let pageAll;

async function preCountry() {
  try {
    let countryApi = (await axios.get(`https://restcountries.com/v3/all`)).data;

    countryApi = countryApi.map((e) => {
      return {
        name: e.name.common,
        bandera: e.flags[0],
        continente: e.continents[0],
        capital: e.capital != undefined ? e.capital[0] : null,

        subregion:
          e.subregion != undefined && e.subregion !== "" ? e.subregion : null,
        area: e.area,
        poblacion: e.population,
      };
    });

    countryApi = await Promise.all(
      countryApi.map((e) => {
        Countries.findOrCreate({
          where: {
            name: e.name,
            bandera: e.bandera,
            continente: e.continente,
            capital: e.capital,
            subregion: e.subregion,
            area: e.area,
            poblacion: e.poblacion,
          }, // Buscar
        });
      })
    );

    return "Country cargados exitosamente";
  } catch (error) {
    return "No se pudo cargar los country";
  }
}

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
      apiPokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon`)).data;

      if (paisXPage > 10 && page > 1) {
        console.log("este es el if del next ");
        apiPokemonNext = (await axios.get(apiPokemon.next)).data.results;
      }

      apiPokemon = apiPokemon.results;

      apiPokemon = apiPokemon.concat(apiPokemonNext);

      dbPokemon = await Pokemon.findAll({ include: Type });

      await Promise.all(
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
      );

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

//Los campos mostrados en la ruta principal
//para cada pokemon(imagen, nombre y tipos)
//N�mero de Pokemon(id)
//Estad�sticas(vida, fuerza, defensa, velocidad)
//Altura y peso

//Recibe los datos recolectados desde
//el formulario controlado de la ruta
//de creaci�n de pokemons por body
//Crea un pokemon en la base de datos


//Pokemon con las siguientes propiedades:
//ID(N�mero de Pokemon) * :
//No puede ser un ID de un pokemon ya existente en la API pokeapi
//Nombre *
//Vida
//Fuerza
//Defensa
//Velocidad
//Altura
//Peso

//Tipo con las siguientes propiedades:
//ID
//Nombre

const addPokemon = async (req, res, next) => {
    console.log(req.body);
    try {
        const { name, life, strength, defense, speed, height, weight, types } = req.body;

        let pokemon = {
            name,
            life,
            strength,
            defense,
            speed,
            height,
            weight
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
        //if (bar === null) {
        //    console.log("Not found!");
        //    bar = await Types.create(type
        //    );
        //} else {
        //    console.log(bar instanceof Types); // true
        //    console.log(bar.name); // 'My Title'
        //}

        const foo = await Pokemon.findOne({ where: { name: pokemon.name } });

        //const fooBar = await pokemons_types.create({
        //    pokemonId: foo.id,
        //    typeId: bar.id,
        //});

            res.json({ ...foo, bar });
        } catch (error) {
            next(error);
        }
    };



async function getPokemonById(req, res, next) {
  try {
    let apiPokemon;
    let dbPokemon;
    let dbType;
    let dbPokemonType;
    let allPokemonCompleted = [];

    const { id } = req.params;
    let pais;
    if (isNaN(id)) {
      pais = await Pokemon.findByPk(id);
    } else {
      pais = await axios.get(`https://restcountries.com/v3.1/alpha/${id}`);
      pais = pais.data;
    }

    dbPokemon = await Pokemon.findOne({ where: { name: pais[0].name.common } });

    dbPokemonType = await pokemones_types.findAll({
      where: {
        pokemonId: {
          // [Op.iLike]: `%${dbCountry.id}%`,
          [Op.eq]: dbPokemon.id,
        },
      },
    });

    let result = Array.isArray(dbPokemonType);
    console.log(result);
    let arrPokemonType = [];
    let objType = new Object();
    for (let i = 0; i < dbPokemonType.length; i++) {
      const element = dbPokemonType[i].typeId;

      arrPokemonType.push(element);
    }

    dbType = await Types.findAll({
      where: {
        id: arrPokemonType,
      },
    });
    objType = {
      type: dbType,
    };

    allPokemonCompleted = [...pais, objType];

    return res.json(allPokemonCompleted);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPokemon,
  getPokemonById,
  // preCountry,
  addPokemon
};
