const express = require('express');
const router = express.Router();

const orderDetailController = require('../controllers/order_detail.controller');

router.route('/')    
    .post(orderDetailController.create)
    .get(orderDetailController.findAll);

router.route('/getOrderByDeskNotEmpty/:orderId')
    .get(orderDetailController.getOrderByDesk);
module.exports = router