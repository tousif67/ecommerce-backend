const Rating = require("../models/rating.model.js");
const productService = require("../Services/product.service.js");

const createRating = async (reqData, user) => {
  const product = await productService.findProductById(reqData.productId);
  const rating = new Rating({
    user: user._id,
    product: product._id,
    rating: reqData.rating,
    createdAt: Date.now(),
  });

  return await rating.save();
};

const getProductRating = async (productId) => {
  return await Rating.find({ product: productId });
};

module.exports = {
  createRating,
  getProductRating,
};
