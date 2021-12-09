const { Pokemon, Type, Op } = require("../db");

const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
//const { types } = require("pg");

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
        let api = false;
        let dataBase = false;
        let Ambas = false;

        let correccion = paisXPage != 12 ? 0 : 3;
        page = page ? page : 1;
        paisXPage = paisXPage ? paisXPage : 9;

        paisXPage = Number(paisXPage);
        correccion = Number(correccion);
        page = Number(page);

        if (filter === "api") {
            api = true;
        } else if (filter === "database") {
            dataBase = true;
        } else if (filter === " ") {
            Ambas = true;

        }


        //#region NAME

        if (name && name !== "") {
            /************************************************************************/
            /******Aca busca por nombre ***********/
            /****** ***********/
            /*************************************************************************/


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
            //*******************************************/
            //***Esta seccion buca todos los pokemons****/
            //*******************************************/


            let resultApi = !dataBase && ((!api && Ambas) || (api && !Ambas))
            let resultDB = !api && ((!dataBase && Ambas) || (dataBase && !Ambas))



            apiPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
            apiPokemon = apiPokemon.data;
            if (paisXPage > 10 && page > 1) {
                console.log("este es el if del next ");
                apiPokemonNext = (await axios.get(apiPokemon.next)).data.results;
            }

            apiPokemon = apiPokemon.results;

            apiPokemon = apiPokemon.concat(apiPokemonNext);

            dbPokemon = await Pokemon.findAll({ include: Type });
            let aux = [];
            console.log("este es el dbPokemon " + dbPokemon)
            await Promise.all(
                await apiPokemon.map(async (e) => {
                    let obj = new Object();
                    obj.name = e.name;

                    let apiAbilities = await axios.get(e.url);
                    apiAbilities = apiAbilities.data;

                    obj.id = apiAbilities.id;
                    obj.imagen = apiAbilities.sprites.other.home.front_default;
                    obj.hp = apiAbilities.stats[0].base_stat;
                    let arrayType = apiAbilities.types;

                    let types = [];

                    arrayType.map((env) => {
                        types.push(env.type.name);
                        obj.type = types;
                    });

                    allPokemons.push(obj);
                })
            );

            resultApi ? allPokemons = allPokemons : resultDB ? allPokemons = dbPokemon : allPokemons = allPokemons.concat(dbPokemon)



            // allPokemons = allPokemons.concat(dbPokemon);

            //#endregion

            //#region ORDER mejoprar el ordenamiento

            if (order === " pokLowest") {

                allPokemons = allPokemons.sort((a, b) => {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());

                });


            } else if (order === "pokHighest") {
                allPokemons = allPokemons.sort((a, b) => {
                    return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
                });




            } else if (order === "hpLowest") {
                allPokemons = allPokemons.sort((a, b) => {
                    return (a.hp - b.hp);;
                });

            } else if (order === "hpHighest") {
                allPokemons = allPokemons.sort((a, b) => {
                    return (b.hp - a.hp);

                })
            }


        }








        //#endregion

        //#region PAGE

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
        const { name, life, strenght, defense, speed, height, weight, types } =
            req.body;

        let pokemon = {
            name,
            life,
            strenght,
            defense,
            speed,
            height,
            weight,
        };




        const tempPokemon = await Pokemon.findOne({ where: { name: pokemon.name } });
        if (await (tempPokemon === null)) {
            console.log('Not found pokemon!');
            await Pokemon.create(pokemon);

        }



        await Type.findOrCreate({ where: { name: types } });

        const temp2Pokemon = await Pokemon.findOne({ where: { name: pokemon.name } });
        const tempType = await Type.findOne({ where: { name: types } })



        await temp2Pokemon.addType(tempType, { through: { selfGranted: false } });



        const result = await Pokemon.findOne({
            where: { name: pokemon.name },
            include: Type,
        });











        let bar = await Type.findOne({
            where: {
                name: types,
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

        //dbPokemon = await Pokemon.findOne({
        //    where: {
        //        id: `{id}`
        //    },
        //});

        allPokemons = allPokemons.concat(dbPokemon);

        return res.json(allPokemons);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getPokemon,
    getPokemonById,

    addPokemon,
};
