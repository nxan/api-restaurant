const express = require('express');
const router = express.Router();

const groupFoodController = require('../controllers/group_food.controller');

router.route('/')
    .get(groupFoodController.findAll)
    .post(groupFoodController.create)
    .put(groupFoodController.update);

router.route('/:groupId')
    .delete(groupFoodController.deleteGroup);

module.exports = router