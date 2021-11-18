const express = require('express');
const router = express.Router();
const users = require('./userRoutes.js');
const products = require('./productRoutes.js');
const admin = require('./adminRoutes.js');
const Controller = require('../controllers/productController')

router.get('/', Controller.getProducts);

router.use('/users', users);

router.use('/products', products);

router.use('/admin', admin)

module.exports = router;