const express = require('express');
const router = express.Router();

const groupFoodController = require('../controllers/group_food.controller');

router.route('/')
    .get(groupFoodController.findAll);


module.exports = router