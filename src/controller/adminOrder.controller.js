const orderService = require("../Services/order.service");

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const confirmOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.confirmOrder(orderId);
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const placeOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.placeOrder(orderId);
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const deliverOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.deliverOrder(orderId);
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const deleteOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.deleteOrder(orderId);
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const shipOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.shipOrder(orderId);
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const cancelOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.cancelOrder(orderId);
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: error.message });
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
