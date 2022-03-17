const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");
const UserSchema = Schema({
  username: { type: String },
  password: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

module.exports = model("User", UserSchema);
