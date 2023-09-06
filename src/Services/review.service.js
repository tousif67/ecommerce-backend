const Review = require("../models/review.model.js");
const productService = require("../Services/product.service.js");

const createReview = async (reqData, user) => {
  const product = await productService.findProductById(reqData.productId);
  const review = new Review({
    user: user._id,
    product: product._id,
    review: reqData.review,
    createdAt: Date.now(),
  });

  await product.save();
  return await review.save();
};

const getAllReview = async (productId) => {
  const product = await productService.findProductById(reqData.productId);
  return await Review.find({ product: productId }).populate("user");
};

module.exports = {
  getAllReview,
  createReview,
};
