// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    description: { type: String, required: true },
    type: { type: String, enum: ['CREATE', 'UPDATE', 'DELETE'], required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    details: { type: Object },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);