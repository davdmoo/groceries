const express = require('express');
const router = express.Router();
const users = require('./userRoutes.js');
const products = require('./productRoutes.js');
const admin = require('./adminRoutes.js')

router.get('/', (req, res) => res.render('home'));

router.use('/users', users);

router.use('/products', products);

router.use('/admin', admin)

module.exports = router;