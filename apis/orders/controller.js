const Order = require("../../db/models/Order");
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("order.product");
    res.status(201).json(orders);
  } catch (error) {
    next(error);
  }
};
exports.createOrder = async (req, res, next) => {
  try {
    req.body.owner = req.user._id;
    // console.log(req.body);
    const newOrder = await Order.create(req.body);
    //const order ={owner:req.user._id, order:req.body}
    //const newOrder= await Order.create(order)
    return res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};
