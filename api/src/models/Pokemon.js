const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
// Nombre *
// Vida
// Fuerza
// Defensa
// Velocidad
// Altura
// Peso


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    //id:{
    //  type: DataTypes.UUID,
    //  defaultValue: DataTypes.UUIDV1,
    //  allowNull:false,
    //  primaryKey:true
    //},
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
      life:{
  type: DataTypes.STRING,
 // allowNull: false,
},

      strength:{
  type: DataTypes.STRING,
  //allowNull: false,
},

      defense:{
  type: DataTypes.STRING,
  //allowNull: false,
},

      speed:{
  type: DataTypes.INTEGER,
 // allowNull: false,
},

      height:{
  type: DataTypes.INTEGER,
  //allowNull: false,
},

      weight:{
  type: DataTypes.INTEGER,
 // allowNull: false,
},


  });
};


