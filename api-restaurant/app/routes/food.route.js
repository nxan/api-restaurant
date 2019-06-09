const express = require('express');
const router = express.Router();

const foodController = require('../controllers/food.controller');

router.route('/')
    .get(foodController.findAll)
    .post(foodController.create)
    .put(foodController.update);

router.route('/:group')
    .get(foodController.findByGroup);

router.route('/:foodId')
    .delete(foodController.deleteFood);

module.exports = router