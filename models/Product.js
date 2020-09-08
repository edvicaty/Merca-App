const { model, Schema } = require("mongoose");
const productSchema = new Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
      enum: ["Jitomate", "Cebolla", "Lechuga", "Mango", "Espinacas"],
    },
    category: {
      type: String,
      default: "Frutas y verduras frescas",
    },
    stores: [
      {
        storeName: String,
        priceProfeco: Number,
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
    ],
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
