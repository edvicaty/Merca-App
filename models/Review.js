const { model, Schema } = require("mongoose");
const reviewSchema = new Schema(
  {
    score: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = model("Review", reviewSchema);
