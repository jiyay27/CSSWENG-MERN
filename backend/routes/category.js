<<<<<<< HEAD
app.post('/api/items/add', categoryController.addCategory);
=======
// routes/items.js
const express = require('express');
const { addCategory, removeCategory } = require('../controllers/categoryController.js');
const router = express.Router();

// Route to add a new item
router.post('/add', addCategory);

// Route to delete an item
router.delete('/delete/:id', removeCategory);

module.exports = router;
>>>>>>> 2a7fc239eac216c86d01d2301b4d0fe9e1ea7534
