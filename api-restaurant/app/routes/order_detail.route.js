const express = require('express');
const router = express.Router();

const orderDetailController = require('../controllers/order_detail.controller');

router.route('/')    
    .post(orderDetailController.create)
    .get(orderDetailController.findAll);

module.exports = router