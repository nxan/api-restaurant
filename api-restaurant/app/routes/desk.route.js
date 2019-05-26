const express = require('express');
const router = express.Router();

const desksController = require('../controllers/desk.controller');

router.route('/')
    .get(desksController.findAll);

router.route('/:place')
    .get(desksController.findByPlace);

router.route('/updateDeskHasPeople/:deskId')
    .put(desksController.updateDeskFull);


module.exports = router