const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationSchema = new Schema(
  {
    airport: {
      type: String,
      enum: ["IAH", "AUS", "DFW", "DEN", "LAX", "SAN", "VCP", "FLL", "MIA"],
    },
    arrival: {
      type: Date,
    },
  },

  {
    timestamps: true,
  }
);

const flightSchema = new Schema(
  {
    airline: {
      type: String,
      enum: [
        "American",
        "Southwest",
        "United",
        "Azul",
        "Delta",
        "JetBlue",
        "Spirit",
        "Alaska",
        "Hawaiian",
      ],
    },
    airport: {
      type: String,
      enum: ["IAH", "AUS", "DFW", "DEN", "LAX", "SAN", "VCP", "FLL", "MIA"],
      default: "DEN",
    },
    flightNo: {
      type: Number,
      required: {
        range: {
          min: 10,
          max: 9999,
        },
      },
    },
    departs: {
      type: Date,
      default: function () {
        const date = new Date().setYear(new Date().getFullYear() + 1);
        return date;
      },
    },
    destinations: [destinationSchema],
    tickets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Compile the schema into a model and export it
module.exports = mongoose.model("Flights", flightSchema);
