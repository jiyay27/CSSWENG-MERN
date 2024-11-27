const Category = require('../models/CategoryModel');

// Controller function to handle adding an order
const addCategory = async (req, res) => {
    const { categName } = req.body; // Changed from itemName to categName

    try {
        const newCategory = new Category({
            categName: categName // Use categName directly
        });

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

// Controller function to get all categories
const getCategories = async (req, res) => {
    try {
        // Fetch all categories from the database
        const categories = await Category.find();
        res.status(200).json({ message: 'Categories retrieved successfully', categories });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories' });
    }
};

module.exports = { addCategory, removeCategory, getCategories};
