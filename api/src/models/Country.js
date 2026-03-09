const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "country",
    {
      id: {
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true, //Identificacion unica
        validate: {
          //validar la longitud del id
          len: [3],
        },
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      flags: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      continents: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      subregion: {
        type: DataTypes.STRING,
      },
      area: {
        type: DataTypes.FLOAT,
      },

      population: {
        type: DataTypes.INTEGER,
      },
      
    },
    {
      timestamps: false, // deshabilito los campos de creacion y actualizacion
      freezeTableName: true, // evita que sequelize pluraliza el nombre de la tabla
    }
  );
};
