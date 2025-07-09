const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware('customer'), async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const items = cart.items.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price
    }));

    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const order = new Order({
      userId: req.user.userId,
      items,
      total
    });

    await order.save();
    await Cart.findOneAndUpdate({ userId: req.user.userId }, { items: [] });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', authMiddleware('admin'), async (req, res) => {
  try {
    const orders = await Order.find().populate('items.productId');
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
