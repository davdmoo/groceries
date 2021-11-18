const express = require('express');
const router = express.Router();
const Controller = require('../controllers/productController.js');

router.get('/', Controller.getProducts);

router.get('/:id', Controller.getProductDetail)

module.exports = router;