const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

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
  const tickets = await Ticket.find({ flight: flight._id });
  flight.destinations = flight.destinations.sort(
    (a, b) => a.arrival - b.arrival
  );
  res.render("flights/show", {
    flight,
    airports: airports.filter((airport) => airport.code !== flight.airport),
    tickets,
  });
}

function newFlight(req, res) {
  res.render("flights/new");
}

async function create(req, res) {
  await Flight.create(req.body);
  res.redirect("/flights");
}
