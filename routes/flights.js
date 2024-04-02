const express = require("express");
const router = express.Router();
const flightsCtrl = require("../controllers/flights");

/* GET flights listing. */
router.get("/", flightsCtrl.index);
//Get new flight form
router.get("/new", flightsCtrl.new);

//Create new flight
router.post("/", flightsCtrl.create);

module.exports = router;
