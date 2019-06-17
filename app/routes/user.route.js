const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.route('/')
    .post(userController.create)
    .put(userController.update);

router.route('/auth')
    .post(userController.auth);

router.route('/:email')
    .get(userController.findEmail);



module.exports = router