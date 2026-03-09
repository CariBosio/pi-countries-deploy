const { Router } = require("express");
//const express = require("express");
const router = Router();
const { Country, Activity } = require("../db");
// const { getAll } = require("../controllers/countries");
//const { getAllActivity } = require("../controllers/activities");
// const { Op } = require("sequelize");


//!POST Activity -------------------------------------------------------
//*Async-await

router.post("/", async (req, res, next) => {
  const { name, difficulty, duration, season, id } = req.body;
console.log(id)
  if( !name || !difficulty || !duration || !season || !id) {
    res.status(404).send("Faltan completar datos requeridos");
  }

  try {
     const newActivitie = await Activity.create({
        name,
        difficulty,
        duration,
        season
     });
    
    //for (let i = 0; i < id.length; i++) {
      const match = await Country.findAll({
        where: {
          name: id
        },
      });

      await newActivitie.addCountry(match);
       
    //await newActivitie.setCountries(countryId);
    res.json(newActivitie);
  } catch (error) {
    next(error);
  }
}
);

//*Promise
// router.post("/",(req, res, next) => {
//   const { name, difficulty, duration, season, countries } = req.body;
 
//   if( !name || !difficulty || !duration || !season || !countries) {
//     res.status(404).send("Faltan completar datos requeridos");
//   }
//   Activity.create({
//     name,
//     difficulty,
//     duration,
//     season
//   }).then((newActivitie) => {
//     //for (let i = 0; i < id.length; i++) {
//       Country.findAll({
//         where: {
//           name: countries
//         },
//       }).then((match) => {
//         newActivitie.addCountry(match);
//         res.json(newActivitie);
//       }).catch((error) => {
//         next(error);
//       }
//       );
//     //}
//   }).catch((error) => {
//     next(error);
//   }
//   );
// }
// );

 
// !GET Activities-------------------------------------------------------
//*Async-await

router.get("/", async (req, res) => {
  try {
    const activities = await Activity.findAll({
      attributes: ["name", "difficulty", "duration", "season"],
      include: Country,
    });
    //res.status(200).send(activities);
    res.status(200).json(activities);
  } catch (error) {
    console.log(error);
  }
});

//*Promise

// router.get("/", (req, res) => {
//   Activity.findAll({
//     attributes: ["name"],
//     include: Country,
//   })
//     .then((activities) => {
//       res.status(200).json(activities);
//     }).catch((error) => {
//       console.log(error);
//     }
//     );
// });


module.exports = router;
