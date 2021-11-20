const { Pokemones, Types, pokemones_types, Op } = require("../db");

const { v4: uuidv4 } = require("uuid");
const axios = require("axios");


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
   
    let { name, order, filter, page } = req.query;
    
    //orden pag /filtrado name
    //name
    //orden
    //pag
    let result;
    let apiPokemon;
    let dbPokemon;
    let allPokemones = [];

    page = page ? page : 0;
    const paisXPage = 10;
    //#region NAME


    if (name && name !== "") {
    
      apiPokemon = (
         await axios.get(`https://restcountries.com/v3/name/${name}`)
    
      ).data;

        if(!apiPokemon){
      dbPokemon = await Pokemones.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      allPokemones = apiPokemon.concat(dbPokemon);
    } else{
      allPokemones = apiPokemon
    }
     
      
    } else {
      console.log("pasa por else")
      apiPokemon = (await axios.get(`https://restcountries.com/v3/all`)).data;

      dbPokemon = await Pokemones.findAll({ include: Activities });

   
        console.log("este arrray es la base de datos " + dbPokemon)
     // allCountry = apiCountry  ;
      allPokemones = apiPokemon ;
      //#endregion

      //#region ORDER mejoprar el ordenamiento

      if (order === "lowest") {
        if (filter === "continente") {
          allPokemones = allPokemon.sort((a, b) => {
            return a.continents[0].toLowerCase().localeCompare(b.continents[0].toLowerCase());
          });
        }
        if (filter === "actividad") {
            allPokemom = allPokemon.sort((a, b) => {
                return a.activity
                    .toLowerCase()
                    .localeCompare(b.activity.toLowerCase());
          });
        }
      } else {
        if (order === "highest") {
          if (filter === "continente") {
            allPokemon = allPokemon.sort((a, b) => {
              return b.continents[0].toLowerCase().localeCompare(a.continents[0].toLowerCase());
            });
          }

          if (filter === "actividad") {
              allPokemon = allPokemon.sort((a, b) => {
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
    result = allPokemon.slice((paisXPage * (page -  1)) , (paisXPage * (page -  1)) + paisXPage )
 
    // //#endregion

    return res.send({
      result: result,
      count: allPokemon.length,
    });
  } catch (error) {
    next(error);
  }
}

//Ruta de detalle de país: debe contener
//  Los campos mostrados en la ruta principal para cada país
// (imagen de la bandera, nombre, código de país de 3 letras y continente)
//  Código de país de 3 letras (id)
//  Capital
//  Subregión
//  Área (Mostrarla en km2 o millones de km2)
//  Población
//  Actividades turísticas con toda su información asociada


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

      pais = await axios.get(
        `https://restcountries.com/v3.1/alpha/${id}`
      );
      pais = pais.data;
    }
 

    dbPokemon = await Pokemon.findOne({ where: { name: pais[0].name.common } });

    dbPokemonType = await pokemones_types.findAll({
      where: {
        pokemonId: {
          // [Op.iLike]: `%${dbCountry.id}%`,
          [Op.eq]: dbPokemon.id
        },
      },
    });

    let result = Array.isArray(dbPokemonType)
console.log(result);
let arrPokemonType = [];
let objType = new Object()
for (let i = 0; i < dbPokemonType.length; i++) {
  const element = dbPokemonType[i].typeId;
    
      arrPokemonType.push(element) ;
      
      }





    dbType = await Types.findAll({
      where: {
        id: arrPokemonType
      },
    });
         objType = {
         type: dbType
        
         }
       
          allPokemonCompleted = [...pais, objType]
  

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
