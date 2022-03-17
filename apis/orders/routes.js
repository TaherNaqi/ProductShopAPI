const express = require("express");
const passport = require("passport");
const router = express.Router();
const { getOrders, createOrder } = require("./controller");
router.get("/orders", getOrders);
router.post(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  createOrder
);
module.exports = router;
