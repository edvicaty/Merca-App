const { model, Schema } = require("mongoose");
const productSchema = new Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    category: {
      type: String,
      default: "Frutas y verduras frescas",
    },
    stores: [
      {
        storeName: String,
        priceProfeco: Number,
        priceUser: [Number],
      },
    ],
    locations: {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
  },
  { timestamps: true }
);
module.exports = model("Product", productSchema);
