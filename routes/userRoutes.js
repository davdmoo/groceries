const express = require('express');
const router = express.Router();
const Controller = require('../controllers/userController.js');

router.use('/', (req, res) => res.send('users list'));

module.exports = router;