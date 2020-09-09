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
    imageUrl: {
      type: String,
      default:
        "https://www.enestadocrudo.com/wp-content/uploads/cropped-verduras-invierno.jpg",
    },
    stores: [
      {
        type: Schema.Types.ObjectId,
        ref: "Store",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
