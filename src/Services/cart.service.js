const Cart = require("../models/cart.model.js");
const CartItem = require("../models/cartItem.model.js");
const Product = require("../models/product.model.js");

const createCart = async (user) => {
  try {
    const cart = new Cart({ user });

    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const findUserCart = async (userId) => {
  try {
    let cart = Cart.findOne({ user: userId });

    let cartItems = await CartItem.find({ cart: cart._id }).populate("product");
    cart.carItems = cartItems;
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (const cartItem of cart.cartItems) {
      totalPrice += cartItem.price;
      totalDiscountedPrice += cartItem.discountedPrice;
      totalItem += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.discount = totalPrice - totalDiscountedPrice;

    return cart;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addCartItem = async (userId,req) => {
  try {
    let cart = Cart.findOne({ user: userId });
    const product = await Product.findById(req.productId)
   const isPresent= await CartItem.findOne({cart:cart._id,product:product._id,userId});
   if(!isPresent){
    const cartItem=new CartItem({
      product:product._id,
      cart:cart._id,
      quantity:1,
      userId,
      price:product.price,
      size:req.size,
      discountedPrice:product.discountedPrice
    })
   }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCart,findUserCart ,addCartItem};
