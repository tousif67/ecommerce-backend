const orderService = require("../Services/order.service.js");

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const confirmOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.confirmOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const placeOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.placeOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const deliverOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    return const orders = await orderService.deliverOrder(orderId);
    res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const deleteOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.deleteOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const shipOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.shipOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const cancelOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.cancelOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
module.exports = {
  getAllOrders,
  confirmOrders,
  placeOrders,
  cancelOrders,
  deleteOrders,
  shipOrders,
  deliverOrders,
};
