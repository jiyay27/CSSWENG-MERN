// controllers/itemController.js
const Item = require('../models/Item');

// Add a new item
const addItem = async (req, res) => {
    const { itemName, category, status, price, description, quantity } = req.body;

    try {
        const newItem = new Item({
            itemName,
            category,
            status,
            price,
            description,
            quantity
        });

        await newItem.save();
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
// controllers/itemController.js
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { itemName, category, status, price, description, quantity } = req.body;

    try {
        // Check if the item exists before trying to update it
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { itemName, category, status, price, description, quantity },
            { new: true, runValidators: true } // `runValidators` to ensure schema validation
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item updated successfully', updatedItem });
    } catch (error) {
        console.error('Error updating item:', error); // Add logging
        res.status(500).json({ message: 'Error updating item', error });
    }
};

// Increment item quantity
const incrementItem = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        // Check if the item exists before trying to update it
        const updateItem = await Item.findByIdAndUpdate(
            id,
            { $inc: { quantity } },
            { new: true, runValidators: true } // `runValidators` to ensure schema validation
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item quantity successfully incremented', updateItem });
    } catch (error) {
        console.error('Error incrementing item quantity:', error); // Add logging
        res.status(500).json({ message: 'Error incrementing item quantity', error });
    }
};

// Decrement item quantity
const decrementItem = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        // Check if the item exists before trying to update it
        const updateItem = await Item.findByIdAndUpdate(
            id,
            { $dec: { quantity } },
            { new: true, runValidators: true } // `runValidators` to ensure schema validation
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item quantity successfully incremented', updateItem });
    } catch (error) {
        console.error('Error incrementing item quantity:', error); // Add logging
        res.status(500).json({ message: 'Error incrementing item quantity', error });
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

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
};

// Filter items by category, status, or price range
const filterItems = async (req, res) => {
    const { category, status, priceMin, priceMax } = req.body;

    try {
        let filters = {};
        if (category) filters.category = category;
        if (status) filters.status = status;
        if (priceMin || priceMax) {
            filters.price = {};
            if (priceMin) filters.price.$gte = priceMin;
            if (priceMax) filters.price.$lte = priceMax;
        }

        const filteredItems = await Item.find(filters);
        res.status(200).json(filteredItems);
    } catch (error) {
        res.status(500).json({ message: 'Error filtering items', error });
    }
};

module.exports = { addItem, getItems, updateItem, deleteItem, filterItems, incrementItem, decrementItem };
