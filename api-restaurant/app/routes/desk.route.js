const express = require('express');
const router = express.Router();

const desksController = require('../controllers/desk.controller');

router.route('/')
    .get(desksController.findAll);


module.exports = router