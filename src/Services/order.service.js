const cartService = require("../Services/cart.service.js");
const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");

const createOrder = async (user, shipAddress) => {
  let address;

  if (shipAddress._id) {
    let existAddress = await Address.findById(shipAddress._id);
    address = existAddress;
  } else {
    address = new Address(shipAddress);
    address.user = user;
    await address.save();

    user.addresses.push(address);
    await user.save();
  }

  const cart = await cartService.findUserCart(user._id);
  const orderItems = [];

  for (const item of cart.cartItems) {
    const orderItem = new orderItems({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });
    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
  }
  const createOrder = new order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totaldiscountedPrice: cart.totaldiscountedPrice,
    discount: cart.discount,
    totalItem: cart.totalItem,
    shipAddress: address,
  });

  const savedOrder = await createOrder.save();
  return savedOrder;
};

const placeOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "PLACED";

  order.paymentDetails.status = "COMPLETED";
  return order.save();
};
const confirmOrder = async (orderId) => {
  const order = await findOrderByOrder(orderId);

  order.orderStatus = "CONFIRM";
  return order.save();
};
const shipOrder = async (orderId) => {
  const order = await findOrderByOrder(orderId);

  order.orderStatus = "SHIPPED";
  return order.save();
};
const deliverOrder = async (orderId) => {
  const order = await findOrderByOrder(orderId);

  order.orderStatus = "DELIVERED";
  return order.save();
};
const cancelOrder = async (orderId) => {
  const order = await findOrderByOrder(orderId);

  order.orderStatus = "CANCELLED";
  return order.save();
};
const findOrderById = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");
  return order;
};
const userOrderHistory = async (userId) => {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getAllOrders = async (orderId) => {
  return await Order.find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();
};
const deleteOrder = async (orderId) => {
  const order = await Order.find(orderId);
  await Order.findByIdAndDelete(order._id);
};

module.exports = {
  createOrder,
  confirmOrder,
  placeOrder,
  cancelOrder,
  getAllOrders,
  shipOrder,
  deliverOrder,
  cancelOrder,
  userOrderHistory,
  findOrderById,
  deleteOrder,
};
