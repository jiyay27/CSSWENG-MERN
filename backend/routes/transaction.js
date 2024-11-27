const express = require('express');
const { getRecentTransactions } = require('../controllers/transactionController');
const router = express.Router();

// GET route to fetch 5 transactions
router.get('/', getRecentTransactions);

module.exports = router;
