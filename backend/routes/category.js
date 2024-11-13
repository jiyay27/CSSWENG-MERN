// routes/items.js
const express = require('express');
const { addCategory, removeCategory } = require('../controllers/categoryController.js');
const router = express.Router();

// Route to add a new item
router.post('/add', addCategory);

// Route to delete an item
router.delete('/delete/:id', removeCategory);

module.exports = router;