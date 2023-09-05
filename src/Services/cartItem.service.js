const userService = require("../Services/user.service");
const CartItem = require("../models/cartItem.model");

const updateCartItems = async (userId, cartItemId, cartItemData) => {
  try {
    const item = await findCartItemById(cartItemId);
    if (!item) {
      throw new Error("cart item not found : ", cartItemId);
    }
    const user = await userService.findUserById(item.userId);

    if (!user) {
      throw new Error("user not found : ", userId);
    }

    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedprice = item.quantity * item.product.discountedprice;
      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("you can't update this card ");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeCartItem = async (userId, cartItemId) => {
  const cartItem = await findCartItemById(cartItemId);
  const user = await userService.findUserById(userId);

  if (user._id.toString() === cartItem.userId.toString()) {
    await CartItem.findByIdAndDelete(cartItemId);
  }
  throw new Error("you can't remove another user's item");
};

const findCartItemById = async (cartItemId) => {
  const cartItem = await findCartItemById(cartItemId);
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("cart item not found with id : ", cartItemId);
  }
};

module.exports = { findCartItemById, removeCartItem, updateCartItems };
