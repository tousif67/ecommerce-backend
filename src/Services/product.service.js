const Category = require("../models/category.model.js");
const Product = require("../models/product.model.js");

const createProduct = async (reqData) => {
  let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
  if (!topLevel) {
    topLevel = new Category({
      name: reqData.topLevelCategory,
      level: 1,
    });
  }
  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: topLevel._id,
  });
  if (!secondLevelecondLevel) {
    secondLevelecondLevel = new Category({
      name: reqData.secondLevelecondLevelCategory,
      parentCategory: topLevel._id,
      level: 2,
    });
  }
  let thirdLevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });
  if (!thirdLevel) {
    thirdLevel = new Category({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    });
  }
  const product = new Product({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    discountPercet: reqData.discountPercet,
    imageUrl: reqData.imageUrl,
    price: reqData.price,
    sizes: reqData.sizes,
    quantity: reqData.quantity,
    category: thirdLevel._id,
  });
  return await product.save();
};
const findProductById = async (id) => {
  const product = await Product.findById(id).populate("category").exec();
  if (!product) {
    throw new Error("Product not found with is : " + id);
  }
  return product;
};

const deleteProduct = async (productId) => {
  const product = await findProductById(productId);
  await Product.findByIdAndDelete(productId);
  return "Product deleted successfully";
};
const updatedProduct = async (reqData, productId) => {
  return await Product.findByIdAndUpdate(productId, reqData);
};
const getAllProducts = async (reqQuery) => {
  let {
    category,
    color,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;
  pageSize = pageSize || 10;
  let query = Product.find().populate("category");
  if (category) {
    const existCategory = await Category.findOne({ name: category });
    if (existCategory) {
      query = query.where("category").equals(existCategory);
    } else {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }
  if (color) {
    const colorSet = new Set(
      color.split(",").map((color) => color.trim().toLowerCase())
    );

    const colorRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

    query = query.where("color").equals(colorRegex);
  }
  if (sizes) {
    const sizesSet = new Set(sizes);

    query = query.where("sizes.name").in(...sizesSet);
  }
  if (minPrice && maxPrice) {
    query = query.where("discountedPrice").gte(minPrice.lte(maxPrice));
  }
  if (minDiscount) {
    query = query.where("discountedPercent").gt(minDiscount);
  }
  if (minDiscount) {
    query = query.where("discountedPercent").gt(minDiscount);
  }
  if (stock) {
    if (stock == "in_stock") {
      query = query.where("quantity").gt(0);
    }
    if (stock == "out_of_stock") {
      query = query.where("quantity").gt(1);
    }
  }
  if (sort) {
    const sortDirection = sort === "price_height";
    query = query.sort({ discountedPrice: sortDirection });
  }

  const totalProduct = await Product.countDocuments(query);

  const skip = (pageNumber - 1) * pageSize;
  query = query.skip(skip).limit(pageNumber);
  const products = await query.exec();
  const totalPages = Math.ceil(totalProduct / pageSize);

  return { content: products, currentPage: pageNumber, totalPages };
};

const createMultipleProduct = async (products) => {
  for (let product of products) {
    await createProduct(product);
  }
};

module.exports = {
  createProduct,
  findProductById,
  deleteProduct,
  updatedProduct,
  getAllProducts,
  createMultipleProduct,
};
