const { Type, Op } = require("../db");
const axios = require("axios");

async function preType() {
  let typeArray = [];
  try {
    let swap = true;
    let paso = 0;
    let urlPrincipal = `https://pokeapi.co/api/v2/pokemon`;
    while (swap) {
      swap = false;
      let typeApi = (await axios.get(urlPrincipal)).data;

      let typeApiResults = typeApi.results;
      let typeApiPrevious = typeApi.previus;
      urlPrincipal = typeApi.next;
      console.log("esta es la next " + urlPrincipal);

      await Promise.all(
        await typeApiResults.map(async (e) => {
          let apiAbilities = await axios.get(e.url);
          apiAbilities = apiAbilities.data;

          let arrayType = apiAbilities.types;

          arrayType.map(async (env) => {
            await typeArray.push(env.type.name);
          });
        })
      );

      for (let i = 0; i < typeArray.length; i++) {
        let name = typeArray[i];
        await Type.findOrCreate({
          where: {
            name: name,
          },
        });
      }

      if (paso < 3) {
        swap = true;
        paso++;
      } else {
        swap = false;
      }
    }

    return "Type cargados exitosamente";
  } catch (error) {
    return "No se pudo cargar los type";
  }
}

async function getType(req, res, next) {
  try {
    let type = await Type.findAll();

    res.json(type);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getType,
  preType,
};
