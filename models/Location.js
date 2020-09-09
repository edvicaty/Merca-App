const { model, Schema } = require("mongoose");
const locationSchema = new Schema(
  {
    state: {
      type: String,
      default: "CDMX",
    },
    municipality: {
      type: String,
    },
    coordinates: {
      long: Number,
      lat: Number,
    },
  },
  { timestamps: true }
);
module.exports = model("Location", locationSchema);
