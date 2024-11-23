const express = require('express');
const { createOrder } = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/order', protect, createOrder);

module.exports = router;

