const Product = require("../../db/models/Product");

exports.fetchProduct = async (productId, next) => {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    next(error);
  }
};

exports.productListFetch = async (req, res, next) => {
  console.log(
    "🚀 ~ file: controllers.js ~ line 13 ~ exports.productListFetch= ~ req",
    req.body
  );
  try {
    const products = await Product.find().populate("shop");
    console.log(
      "🚀 ~ file: controllers.js ~ line 15 ~ exports.productListFetch= ~ products",
      products
    );
    return res.json(products);
  } catch (error) {
    next(error);
    // return res.status(500).json({ message: error.message });
  }
};

exports.productDetailFetch = async (req, res, next) => {
  console.log("product", req.product.id);
  res.status(200).json(req.product);
};
exports.productUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
    }
    const product = await Product.findByIdAndUpdate(
      req.product,
      req.body,
      { new: true, runValidators: true } // returns the updated product
    ).populate("shop");
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.productDelete = async (req, res, next) => {
  try {
    await req.product.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Create
// Status: 201
// Content: newly created item

// Retrieve (List && Detail)
// Status: 200
// Content: Requested data

// Update
// Status: 200
// Content: updated item

// Delete
// Status: 204
// Content: No Content
