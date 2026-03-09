const express = require("express");
const routesPut = express.Router();
const { Country, Activity } = require("../db");


//*Async-await    
/* The above code is updating the activity table with the new information that is being passed in. */
routesPut.put('/', async (req, res) =>{
      const {countryId, id, name, difficulty, season,duration} = req.body
      try{
      await Activity.update({
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season
      },
      {
        where:{
          id: id
        }
      }
      )
      const activity = await Activity.findByPk(id)
      await activity.setCountries(countryId)
      res.json(activity)
      }catch(error){
        res.send(error)
      }
    })

//*Promise
// routesPut.put('/', (req, res) =>{
//       const {countryId, id, name, difficulty, season,duration} = req.body
//       Activity.update({
//         name: name,
//         difficulty: difficulty,
//         duration: duration,
//         season: season
//       },
//       {
//         where:{
//           id: id
//         }
//       }
//       ).then(() => {
//         Activity.findByPk(id).then((activity) => {
//           activity.setCountries(countryId).then(() =>
//             res.json(activity)
//           )
//         })
//       }).catch((error) => {
//         res.send(error)
//       }
//       )
//     }
//     );


  
module.exports = routesPut;
