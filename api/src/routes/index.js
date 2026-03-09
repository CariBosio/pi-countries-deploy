const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countries = require("./countries");
const activities = require("./activities");
const deletes = require("../routes/delete");
const puts = require("../routes/put");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//va a countries
router.use("/countries", countries);

//va a activities
router.use("/activity", activities);

//eliminar activities
router.use("/delete", deletes);

//actualizar activities
router.use("/put", puts);



module.exports = router;
