// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., "addItem", "createOrder"
    action: { type: Object, required: true }, // Specific details of the transaction
    timestamp: { type: Date, default: Date.now }, // When the transaction occurred
});

module.exports = mongoose.model('Transaction', transactionSchema);