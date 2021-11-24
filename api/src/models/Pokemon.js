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
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
vida:{
  type: DataTypes.STRING,
 // allowNull: false,
},

fuerza:{
  type: DataTypes.STRING,
  //allowNull: false,
},

defensa:{
  type: DataTypes.STRING,
  //allowNull: false,
},

velocidad:{
  type: DataTypes.INTEGER,
 // allowNull: false,
},

altura:{
  type: DataTypes.INTEGER,
  //allowNull: false,
},

peso:{
  type: DataTypes.INTEGER,
 // allowNull: false,
},


  });
};


