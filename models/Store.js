const { model, Schema } = require("mongoose");
const storeSchema = new Schema(
  {
    storeName: String,
    priceProfeco: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    average: {
      type: Number,
      default: 0,
    },
    priceUser: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    locations: {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
  },
  { timestamps: true }
);

module.exports = model("Store", storeSchema);
