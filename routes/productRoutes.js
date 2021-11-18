const express = require('express');
const router = express.Router();
const Controller = require('../controllers/productController.js');

router.use('/', (req, res) => res.redirect('/products'));

router.use('/products', Controller.getProducts);

router.use('/update/:id', (req, res) => res.send('edit product page'));
router.post('/update/:id', (req, res) => res.send('post edit product page'));

router.use('/delete/:id', (req, res) => res.send('delete product page'));

module.exports = router;