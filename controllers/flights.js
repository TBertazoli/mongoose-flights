const Flight = require("../models/flight");

module.exports = {
  index,
  show,
  new: newFlight,
  create,
};

async function index(req, res) {
  let flights = await Flight.find({});
  flights = flights.map((flight) => {
    return {
      ...flight._doc,
      departs: flight.departs.toLocaleDateString(),
    };
  });
  res.render("flights/index", { flights });
}

async function show(req, res) {
  const flight = await Flight.findById(req.params.id);
  res.render("flights/show", { flight });
}

function newFlight(req, res) {
  res.render("flights/new");
}

async function create(req, res) {
  await Flight.create(req.body);
  res.redirect("/flights");
}
