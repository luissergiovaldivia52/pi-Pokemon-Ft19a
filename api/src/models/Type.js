const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

//ID
//Nombre
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('type', {
         id: {
                 type: DataTypes.STRING,
                 primaryKey: true

               },

        name: {
            type: DataTypes.STRING,

        },
       
        
    });
};



