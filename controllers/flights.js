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
  const airports = [
    { code: "IAH", name: "George Bush Intercontinental Airport" },
    { code: "AUS", name: "Austin-Bergstrom International Airport" },
    { code: "DFW", name: "Dallas/Fort Worth International Airport" },
    { code: "DEN", name: "Denver International Airport" },
    { code: "LAX", name: "Los Angeles International Airport" },
    { code: "SAN", name: "San Diego International Airport" },
    { code: "VCP", name: "Viracopos International Airport" },
    { code: "FLL", name: "Fort Lauderdale-Hollywood International Airport" },
    { code: "MIA", name: "Miami International Airport" },
  ];
  const flight = await Flight.findById(req.params.id);
  const destinations = res.render("flights/show", {
    flight,
    airports: airports.filter((airport) => airport.code !== flight.airport),
  });
}

function newFlight(req, res) {
  res.render("flights/new");
}

async function create(req, res) {
  await Flight.create(req.body);
  res.redirect("/flights");
}
