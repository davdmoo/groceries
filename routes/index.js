const express = require('express');
const router = express.Router();
const users = require('./userRoutes.js');
const products = require('./productRoutes.js');

// router.use('/', (req, res) => res.redirect);

router.use('/users', users);

router.use('/', products);

module.exports = router;