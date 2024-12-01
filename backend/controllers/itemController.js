// controllers/itemController.js
const Item = require('../models/ItemModel');
const Transaction = require('../models/TransactionModel');

const LOW_STOCK_THRESHOLD = 10;
const NO_STOCK_THRESHOLD = 0;

// Add a new item
const addItem = async (req, res) => {
    const { itemName, category, price, description, quantity } = req.body;

    try {
        // Determine initial status based on quantity
        let status = 'In Stock';
        if (quantity <= NO_STOCK_THRESHOLD) {
            status = 'Out of Stock';
        } else if (quantity <= LOW_STOCK_THRESHOLD) {
            status = 'Low Stock';
        }

        const newItem = new Item({
            itemName,
            category,
            status,
            price,
            description,
            quantity
        });

        await newItem.save();

        // Create a transaction record
        const transaction = new Transaction({
            description: `Added new item: ${itemName}`,
            type: 'CREATE',
            itemId: newItem._id,
            details: { itemName, category, status, price, quantity }
        });
        await transaction.save();

        res.status(201).json({ message: 'Item added successfully', newItem });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item', error });
    }
};

// Get all items
const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
};

// Update an item
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { itemName, category, status, price, description, quantity } = req.body;

    try {
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { itemName, category, status, price, description, quantity },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Create a transaction record
        const transaction = new Transaction({
            description: `Updated item: ${itemName}`,
            type: 'UPDATE',
            itemId: id,
            details: { itemName, category, status, price, quantity }
        });
        await transaction.save();

        res.status(200).json({ message: 'Item updated successfully', updatedItem });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Error updating item', error });
    }
};

// Delete an item
const deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedItem = await Item.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Create a transaction record
        const transaction = new Transaction({
            description: `Deleted item: ${deletedItem.itemName}`,
            type: 'DELETE',
            itemId: id,
            details: { itemName: deletedItem.itemName }
        });
        await transaction.save();

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
};

// Increment item quantity
const incrementItem = async (req, res) => {
    const { id } = req.params;
    const incrementAmount = 1;

    try {
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const newQuantity = item.quantity + incrementAmount;
        let newStatus = 'In Stock';
        if (newQuantity <= NO_STOCK_THRESHOLD) {
            newStatus = 'Out of Stock';
        } else if (newQuantity <= LOW_STOCK_THRESHOLD) {
            newStatus = 'Low Stock';
        }

        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { 
                $inc: { quantity: incrementAmount },
                status: newStatus
            },
            { new: true }
        );

        // Create a transaction record
        const transaction = new Transaction({
            description: `Incremented quantity for: ${item.itemName}`,
            type: 'UPDATE',
            itemId: id,
            details: { itemName: item.itemName, quantity: newQuantity }
        });
        await transaction.save();

        res.status(200).json({ 
            success: true, 
            message: 'Item quantity successfully incremented',
            updateItem: updatedItem
        });
    } catch (error) {
        console.error('Error incrementing item quantity:', error);
        res.status(500).json({ message: 'Error incrementing item quantity', error });
    }
};

// Decrement item quantity
const decrementItem = async (req, res) => {
    const { id } = req.params;
    const decrementAmount = 1;

    try {
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (item.quantity <= 0) {
            return res.status(400).json({ message: 'Cannot decrement. Quantity already at 0.' });
        }

        const newQuantity = item.quantity - decrementAmount;
        let newStatus = 'In Stock';
        if (newQuantity <= NO_STOCK_THRESHOLD) {
            newStatus = 'Out of Stock';
        } else if (newQuantity <= LOW_STOCK_THRESHOLD) {
            newStatus = 'Low Stock';
        }

        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { 
                $inc: { quantity: -decrementAmount },
                status: newStatus
            },
            { new: true }
        );

        // Create a transaction record
        const transaction = new Transaction({
            description: `Decremented quantity for: ${item.itemName}`,
            type: 'UPDATE',
            itemId: id,
            details: { itemName: item.itemName, quantity: newQuantity }
        });
        await transaction.save();

        res.status(200).json({ 
            success: true,
            message: 'Item quantity successfully decremented',
            updateItem: updatedItem
        });
    } catch (error) {
        console.error('Error decrementing item quantity:', error);
        res.status(500).json({ message: 'Error decrementing item quantity', error });
    }
};

module.exports = { 
    addItem, 
    getItems, 
    updateItem, 
    deleteItem, 
    incrementItem, 
    decrementItem 
};