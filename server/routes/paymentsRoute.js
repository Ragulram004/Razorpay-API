const express = require('express');
const router = express.Router();
const {createOrder, verifyPayment} = require('../controller/paymentsController.js');

router.post('/createOrder', createOrder);
router.post('/verifyPayment', verifyPayment);

module.exports = router;