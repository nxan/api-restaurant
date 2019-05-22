const express = require('express');
const router = express.Router();

const desksController = require('../controllers/desk.controller');

router.route('/:place')
    .get(desksController.findAll);


module.exports = router