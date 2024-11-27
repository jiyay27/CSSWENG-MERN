// routes/items.js
const express = require('express');
const { addCategory, removeCategory, getCategories } = require('../controllers/categoryController.js');
const router = express.Router();

// Route to add a new item
router.post('/add', addCategory);

// Route to delete an item
router.delete('/delete/:id', removeCategory);

// Route to delete an item
router.get('/all', getCategories);

module.exports = router;
