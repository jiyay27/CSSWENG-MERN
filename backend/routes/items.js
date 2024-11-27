// routes/items.js
const express = require('express');
const { addItem, getItems, updateItem, deleteItem, incrementItem, decrementItem } = require('../controllers/itemController.js');
const router = express.Router();

// Route to add a new item
router.post('/add', addItem);

// Route to get all items
router.get('/', getItems);

// Route to update an existing item
router.put('/update/:id', updateItem);

// Route to delete an item
router.delete('/delete/:id', deleteItem);

// Route to filter items
//router.post('/filter', filterItems);

// Route to increment item quantity
router.put('/increment/:id', incrementItem);

// Route to decrement item quantity
router.put('/decrement/:id', decrementItem);

module.exports = router;
