const express = require('express');
const router = express.Router();

const placeController = require('../controllers/place.controller');

router.route('/')
    .get(placeController.findAll)
    .post(placeController.create)
    .put(placeController.update);

router.route('/:placeId')
    .delete(placeController.deletePlace);


module.exports = router