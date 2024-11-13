// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, default: 1, rerquired: false}
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
