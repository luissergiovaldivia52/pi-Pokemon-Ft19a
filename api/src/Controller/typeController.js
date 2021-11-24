const { Types, Pokemones, pokemones_types } = require("../db");
const axios = require("axios");
//const {YOUR_API_KEY, YOUR_DATE} = require ('../db')

async function preActivity() {
  try {
    let activityApi = (
      await axios.get(
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&dates=${YOUR_DATE}`
      )
    ).data.results;

    activityApi = activityApi.map((e) => {
      return e.name;
    });

    activityApi = activyApi.map((e) => {
      for (let i = 0; i < e.length; i++) {
        const element = e[i];
        return element;
      }
    });

    activityApi = activityApi.map((e) => {
      return {
        name: e.name,
      };
    });

    activityApi = await Promise.all(
      // console.log("este es el promise all"),
      activityApi.map((e) =>
        Activity.findOrCreate({
          where: {
            name: e.name,
            //slug: e.slug } // Buscar
          },
        })
      )
    );

    return "Genero cargados exitosamente";
  } catch (error) {
    return "No se pudo cargar los genero";
  }
}

async function getType(req, res, next) {
  try {
    let type = await Types.findAll();
    res.json(type);
  } catch (error) {
    next(error);
  }
}

const addType = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, dificultad, duracion, temporada, country } = req.body;

    let type = {
      name,
      dificultad,
      duracion,
      temporada,
    };

    let pokemon = {
      name,
      bandera: "#bandera 1",
      continente: "#continente 1",
    };
    pais.name = country;

    let bar = await Types.findOne({
      where: {
        name: type.name,
      },
    });
    if (bar === null) {
      console.log("Not found!");
        bar = await Types.create(type
        );
    } else {
      console.log(bar instanceof Types); // true
      console.log(bar.name); // 'My Title'
    }

    let foo = await Pokemones.findOne({ where: { name: pais.name } });

    const fooBar = await pokemones_types.create({
      pokemonId: foo.id,
      typeId: bar.id,
    });

    res.json({ ...foo, bar });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getType,
  //preActivity,
  addType,
};
