const express = require('express');
const router = express.Router();

const orderDetailController = require('../controllers/order_detail.controller');

router.route('/')    
    .post(orderDetailController.create)
    .get(orderDetailController.findAll);

router.route('/getOne/:deskId')
    .get(orderDetailController.getOrderDesk);
module.exports = router