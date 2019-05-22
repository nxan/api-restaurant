const express = require('express');
const router = express.Router();

const placeController = require('../controllers/place.controller');

router.route('/')    
    .get(placeController.findAll);
    

module.exports = router