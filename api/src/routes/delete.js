const express = require("express");
const routesDelete = express.Router();
const { Country, Activity } = require("../db");

// routesDelete.get("/", async (req, res) => {
//   const { name } = req.query;
//   try {
//     if (!name) {
//       const allActivity = await Activity.findAll({
//         attributes: ["name"],
//         include: Country,
//       });
//       res.status(200).send(allActivity);
//     } else {
//       const nameActivity = await Activity.findAll({
//         where: {
//           name: name,
//         },
//         include: Country,
//       });
//       if (nameActivity) {
//         res.status(200).send(nameActivity);
//       }
//       res.status(404).send("No se encontro la actividad");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

//*Async-await

// routesDelete.delete("/", async (req, res) => {
//   const { name } = req.query;
//   try {
//     await Activity.destroy({
//       where: {
//         name: name,
//       },
//     });
//     res.status(200).send("Actividad eliminada");
//   } catch (error) {
//     res.send(error);
//   }
// });

//*Promises

routesDelete.delete("/", (req, res) => {
  const { name } = req.query;
  Activity.destroy({
    where: {
      name: name,
    },
  })
    .then((activity) => {
      if (activity) {
        res.status(200).send("Actividad eliminada");
      }else{
        res.status(404).send("Esa actividad no existe para eliminar");
      }
    }).catch((error) => {
      res.send(error);

    } );
}
);


module.exports = routesDelete;
