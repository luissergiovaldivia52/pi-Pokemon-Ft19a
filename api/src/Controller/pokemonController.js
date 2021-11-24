const { Pokemon, Type, pokemons_types, Op } = require("../db");

const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

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
      apiPokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data //(`https://pokeapi.co/api/v2/pokemon/${name}`)
       // .data;
      console.log("api con name " + apiPokemon.name)
      //apiPokemon)

      
    //  apiPokemon = apiPokemon.results;


    //  apiPokemon = apiPokemon.concat(apiPokemonNext);

     // dbPokemon = await Pokemon.findAll({ include: Type });

 

      // await Promise.all(
        // apiPokemon.map(async (e) => {
          let obj = { name: apiPokemon.name };

         // let apiAbilities = (await axios.get(e.formns.url)).data;
          obj.id = apiPokemon.id;

          let arrayType = apiPokemon.types;
          let types = [];
          // arrayType.map((e) => {
          //   types.push(e.type.name);
          //   obj.type = types;
          // });
          for (let i = 0; i < arrayType.length; i++) {
           
            types.push(arrayType[i].type.name);
             obj.type = types;            
          }


          // let apiUrlForm = e.forms[0].url;

          // let apiForm = (await axios.get(apiUrlForm)).data;

          obj.imagen = apiPokemon.sprites.other.home.front_default;

          allPokemons.push(obj);
        // })
      // );

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
        if (filter === "continente") {
          allPokemons = allPokemons.sort((a, b) => {
            return a.continents[0]
              .toLowerCase()
              .localeCompare(b.continents[0].toLowerCase());
          });
        }
        if (filter === "actividad") {
          allPokemoms = allPokemons.sort((a, b) => {
            return a.activity
              .toLowerCase()
              .localeCompare(b.activity.toLowerCase());
          });
        }
      } else {
        if (order === "highest") {
          if (filter === "continente") {
            allPokemons = allPokemons.sort((a, b) => {
              return b.continents[0]
                .toLowerCase()
                .localeCompare(a.continents[0].toLowerCase());
            });
          }

          if (filter === "actividad") {
            allPokemons = allPokemons.sort((a, b) => {
              return b.activity
                .toLowerCase()
                .localeCompare(a.activity.toLowerCase());
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
};

//esto es una pruba