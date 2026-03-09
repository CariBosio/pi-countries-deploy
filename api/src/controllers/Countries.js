const axios = require("axios");
const { Country, Activity } = require("../db");
const { Op } = require("sequelize");


//!GET a la Api------------------------------------------------------------------------------
//*Async-await

//?esta función me trae la info de la API

const prechargeCountries = async () => {
  try {
    // Agregamos ?fields= para que la API no nos bloquee por pedir demasiada info
    const url = "https://restcountries.com/v3.1/all?fields=name,cca3,flags,continents,capital,subregion,area,population";
    let apiCountriesResponse = await axios.get(url);

    const apiCountries = apiCountriesResponse.data.map((country) => {
      return {
        name: country.name.common,
        id: country.cca3,
        flags: country.flags.png, // Usamos .png que es más estable que el array [0]
        continents: country.continents[0],
        capital: (country.capital && country.capital.length > 0) ? country.capital[0] : "No capital",
        subregion: country.subregion || "No subregion",
        area: country.area,
        population: country.population,
      };
    });

    await Country.bulkCreate(apiCountries); 
    console.log("¡Países cargados exitosamente en Neon!");
  } catch (error) {
    // Esto nos va a mostrar el error real en los logs de Render si algo falla
    if (error.response) {
      console.log("Error de la API:", error.response.data);
    } else {
      console.log("Error de conexión:", error.message);
    }
  }
};

//*Promises
// const prechargeCountries = () => {
//   try {
//    let apiCountries = axios.get("https://restcountries.com/v3/all");
//     apiCountries
//       .then((res) => {
//         res.data.map((country) => {
//           return {
//             name: country.name.common,
//             id: country.cca3,
//             flags: country.flags[0],
//             continents: country.continents[0],
//             capital: country.capital ? country.capital[0] : " ",
//             subregion: country.subregion,
//             area: country.area,
//             population: country.population,
//           };
//         });
//         Country.bulkCreate(apiCountries); //guardar en DB - bulkCreate es una función de sequelize que Crea e inserta varias instancias de forma masiva.
//       }).catch((error) => {
//         console.log(error);
//       }
//       );
//   } catch (error) {
//     console.log(error);
//   }
// }


//!GET a la base de datos
// //*Async-await

// //?me trae la info de la base de datos
const getAll = async (name) => {
  const count = await Country.count();
  if (count === 0) {
    await prechargeCountries(); // Esto usa la URL de restcountries.com que ya tenés
  }

  const where = {};
  if (name) {
    where.name = { [Op.iLike]: `%${name}%` }; 
  }

  return await Country.findAll({
    where: where,
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "duration", "season"],
      through: { attributes: [] },
    },
  });
};

//*Promise
// const getAll = (name) => {
//   const where = {};
//   if (name) {
//     where[name] = { [Op.iLike]: name };
//   }
//   return Country.findAll({  
//     where: where,
//     include: {
//       model: Activity,
//       attributes: ["name", "difficulty", "duration", "season"],
//       through: {
//         attributes: [],
//       },
//     },
//   });
//    if (!name && !countries.length) {
//     prechargeCountries();
//     return Country.findAll({
//       where: where,
//       include: {
//         model: Activity,
//         attributes: ["name", "difficulty", "duration", "season"],
//         through: {
//           attributes: [],
//         },
//       },
//     });
//   }
// }

module.exports = {
  getAll,
};
