const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const OrderSchema = mongoose.Schema(
  {
    order: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, min: 0 },
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
