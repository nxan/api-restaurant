const express = require('express');
const router = express.Router();

const desksController = require('../controllers/desk.controller');

router.route('/')
    .get(desksController.findAll);

router.route('/:place')
    .get(desksController.findByPlace);

module.exports = router