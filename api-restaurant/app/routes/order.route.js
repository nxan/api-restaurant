const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');

router.route('/')    
    .get(orderController.findAll)
    .put(orderController.update)
    .post(orderController.create);


module.exports = router