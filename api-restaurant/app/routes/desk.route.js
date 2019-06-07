const express = require('express');
const router = express.Router();

const desksController = require('../controllers/desk.controller');

router.route('/')
    .get(desksController.findAll)
    .post(desksController.create)
    .put(desksController.update);

router.route('/:place')
    .get(desksController.findByPlace);

router.route('/updateDeskHasPeople/:deskId')
    .put(desksController.updateDeskFull);

router.route('/updateDeskEmpty/:deskId')
    .put(desksController.updateDeskEmpty);


module.exports = router