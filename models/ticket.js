const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    seat: {
      type: String,
      required: true,
      unique: true,
      match: /[A-F][1-9]\d?/,
    },
    price: Number,
    flight: {
      type: Schema.Types.ObjectId,
      ref: "Flight",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tickets", ticketSchema);
