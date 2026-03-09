const { DataTypes } = require("sequelize");  
//DataTypes ->función que define el modelo de datos
// conexión a sequelize  


module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        validate: {
          //Unicos valores permitidos
          min: 1,
          max: 5,
        },
        allowNull: false,
      },
      duration: {
        type: DataTypes.TIME,
       allowNull: false,
      },
      season: {
            type: DataTypes.ARRAY(DataTypes.ENUM({
                values: ['Verano', 'Otoño', 'Invierno', 'Primavera']
            })),
              allowNull: false
          },
    },
    {
      timestamps: false, // deshabilito los campos de creacion y actualizacion
      freezeTableName: true, // evita que sequelize pluraliza el nombre de la tabla
    }
  );
};
