const express = require('express');
const router = express.Router();

const orderDetailController = require('../controllers/order_detail.controller');

router.route('/')    
    .post(orderDetailController.create)
    .get(orderDetailController.findAll)
    .put(orderDetailController.updateFoodByOrderId);

router.route('/getOne/:deskId')
    .get(orderDetailController.getOrderDesk);

router.route('/:orderId/:foodId')
    .delete(orderDetailController.deleteFood);

module.exports = router