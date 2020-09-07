const { model, Schema } = require("mongoose");
const locationSchema = new Schema(
  {
    state: {
      type: String,
    },
    municipality: {
      type: String,
    },
    coordinates: {
      lat: Number,
      long: Number,
    },
  },
  { timestamps: true }
);
module.exports = model("Location", locationSchema);
