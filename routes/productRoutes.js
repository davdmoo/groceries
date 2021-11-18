const express = require('express');
const router = express.Router();
const Controller = require('../controllers/productController.js');

router.get('/', Controller.allProducts);

router.get('/:id', Controller.getProductDetail);

router.get('/:id/buy', Controller.buyProduct);

module.exports = router;