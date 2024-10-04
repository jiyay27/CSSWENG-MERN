const express = require('express');
const { loginUser } = require('../controllers/loginController'); // Import the login handler
const router = express.Router();

router.post('/', loginUser);

module.exports = router;
