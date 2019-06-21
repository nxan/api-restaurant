const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');

router.route('/')
    .get(orderController.findAll)
    .put(orderController.update)
    .post(orderController.create);

router.route('/pay')
    .put(orderController.placeOrder);

router.route('/checkDesk/:deskId')
    .get(orderController.checkDesk);

router.route('/updateQuantityFood')
    .put(orderController.updateQuantityFood);

router.route('/countCreated')
    .get(orderController.countCreated);

router.route('/print/:deskId/:timeEnd')
    .get(orderController.findOrderByDeskEnd);


module.exports = router