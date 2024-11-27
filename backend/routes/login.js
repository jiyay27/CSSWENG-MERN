const express = require('express');
const { loginUser, resetPassword } = require('../controllers/loginController');
const router = express.Router();

router.post('/', loginUser);
router.post('/reset-password', resetPassword);

module.exports = router;
