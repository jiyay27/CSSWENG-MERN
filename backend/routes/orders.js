const express = require('express');
const { addOrderHandler, getOrders } = require('../controllers/orderController');
const router = express.Router();

// POST route to add an order
router.post('/add', addOrderHandler);

// GET route to fetch all orders
router.get('/', getOrders);

module.exports = router;
