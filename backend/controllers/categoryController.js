const Category = require('../models/CategoryModel');

// Controller function to handle adding an order
const addCategory = async (req, res) => {
    const { orderID, itemName, status, price, date } = req.body;

    try {
        // Check if the category already exists
        const existingCategory = await Category.findOne({ categName });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        // Create a new category instance
        const newCategory = new Category({ categName });

        // Save the category to the database
        await newCategory.save();

        res.status(201).json({ message: 'Category added successfully', newCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error adding category' });
    }
};

const removeCategory = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and remove the category by its ID
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category removed successfully', deletedCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error removing category' });
    }
};

module.exports = { addCategory, removeCategory };
