const Flight = require("../models/flight");

module.exports = {
  index,
  new: newFlight,
  create,
};

async function index(req, res) {
  const flights = Flight.find({});
  res.render("flights/index", { flights });
}

function newFlight(req, res) {
  res.render("flights/new");
}

async function create(req, res) {
  await Flight.create(req.body);
  res.redirect("/flights");
}
