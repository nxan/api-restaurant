const express = require('express');
const router = express.Router();

const foodController = require('../controllers/food.controller');

router.route('/')
    .get(foodController.findAll);


module.exports = router