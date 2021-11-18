const express = require('express');
const router = express.Router();
const Controller = require('../controllers/productController.js');

// router.use('/', (req, res) => res.redirect('/products'));

router.get('/', Controller.getProducts);

router.get('/update/:id', (req, res) => res.send('edit product page'));
router.post('/update/:id', (req, res) => res.send('post edit product page'));

router.get('/delete/:id', (req, res) => res.send('delete product page'));

module.exports = router;