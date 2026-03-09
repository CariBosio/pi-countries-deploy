const { Router } = require("express");
const { getAll } = require("../controllers/Countries");
const { Country, Activity } = require("../db");
const router = Router();




//!GET /countries?name="..." -------------------------------------------------------
//*Async-await

router.get("/", async (req, res) => {
  const {name} = req.query;
  const countriesTotal = await getAll();
  if (name) {
    try{
    const countriesName = await countriesTotal.filter((el) =>
      el.name.toLowerCase() === (name.toLowerCase())
    ); //el.name -> nombre de cada pais
    countriesName.length
      ? res.status(200).send(countriesName)
      : res.status(404).send("No se encontro el pais");
    }catch(error){
    // res.json({msg: "No se encuentra el nombre del país en la base de datos"})
    res.status(404).send("No se encontro el pais");
    }     
  } else {
    try{
    //si no hay un query name
    res.status(200).send(countriesTotal);
    }catch(error){
    // res.json({msg: "No se encuentra el nombre del país en la base de datos"})
    res.status(404).send("No se encontro el pais");
  }
}
});

//*Promise

// router.get("/", (req, res) => {
//   const { name } = req.query;
//  getAll()
//   .then((countries) => {
//     if (name) {
//       const countriesName = countries.filter((el) =>
//         el.name.toLowerCase().includes(name.toLowerCase())
//       ); //el.name -> nombre de cada pais
//       countriesName.length
//         ? res.status(200).send(countriesName)
//         : res.status(404).send("No se encontro el pais");
//     } else {
//       res.status(200).send(countries);
//     }
//   }).catch((error) => {
//     res.status(404).send("No se encontro el pais");
//   }
//   );
// }
// );

// !GET ID COUNTRY-----------------------------------------------------------------

// *Async-await

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allId = await getAll();
    const countryId = allId.find(
      (el) => el.id.toUpperCase() === id.toUpperCase()
    );
    countryId
      ? res.status(200).json(countryId)
      : res.status(404).send("No se encontro el pais");
  } catch (error) {
    res.send(error);
  }
});


// *Promise

// router.get("/:id",(req, res) => {
//   const {id}= req.params;
//   getAll()
//   .then(countries => {
//     const countryId = countries.find(
//       (el) => el.id.toUpperCase() === id.toUpperCase()
//     );
//     countryId
//       ? res.status(200).json(countryId)
//       : res.status(404).send("No se encontro el pais");
//   }).catch(error => {
//     res.send(error);
//   }
//   )
// }
// )

module.exports = router;
