const express = require('express');
const router = express.Router();
const {signUp} = require('../controllers/user')

router
    .route('/users')
    .post(signUp)

    module.exports = router