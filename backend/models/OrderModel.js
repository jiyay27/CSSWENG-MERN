const mongoose = require('mongoose');

// Define the schema for orders
const orderSchema = new mongoose.Schema({
    orderID: { type: Number, required: true },
    itemName: { type: String, required: true },
    status: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

// Function to add a new order
const addOrder = async (orderID, itemName, status, price, date) => {
    try {
        // Create a new order instance
        const newOrder = new Order({
            orderID: orderID,
            itemName: itemName,
            status: status,
            price: price,
            date: date,
        });

        // Save the order to the database
        await newOrder.save();
        console.log('Order added successfully');
    } catch (error) {
        console.error('Error adding order:', error);
    }
};

// Export the Order model and the addOrder function
module.exports = { Order, addOrder };

// Example usage to add a test order (can be called where needed)
// addOrder (1, 'testItem', 'testStatus', 100, '2024-10-01');
