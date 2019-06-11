const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.route('/')
    .post(userController.create);

router.route('/auth')
    .post(userController.auth);


module.exports = router