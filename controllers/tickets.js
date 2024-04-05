const Ticket = require("../models/ticket");
const Flight = require("../models/flight");

module.exports = {
  create,
};

async function create(req, res) {
  const flight = await Flight.findById(req.params.id);
  req.body.flight = flight._id;
  try {
    await Ticket.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/flights/${flight._id}`);
}
