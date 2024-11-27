const { Order, addOrder } = require('../models/OrderModel');
const Transaction = require('../models/TransactionModel');

// Controller function to handle adding an order
const addOrderHandler = async (req, res) => {
    const { orderID, itemName, status, price, date } = req.body;

    try {
        // Call the addOrder function
        await addOrder(orderID, itemName, status, price, date);

        await Transaction.create({
            name: itemName,
            action: "was ordered.",
        });

        res.status(201).json({ message: 'Order added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding order' });
    }
};

// Controller function to get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find(); // Fetch all orders from the database
        res.json(orders); // Send the orders as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

module.exports = { addOrderHandler, getOrders };
