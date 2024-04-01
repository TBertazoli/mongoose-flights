const Flight = require("../models/flight");

module.exports = {
  index,
};

async function index(req, res) {
  const flights = Flight.find({});
  res.render("flights/index", { flights });
}
