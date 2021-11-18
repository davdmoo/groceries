const express = require('express');
const router = express.Router();
const users = require('./userRoutes.js');
const products = require('./productRoutes.js');
const admin = require('./adminRoutes.js');
const ProductController = require('../controllers/productController');
const UserController = require('../controllers/userController');

router.get('/', ProductController.getProducts);

router.get('/register', UserController.getRegister);
router.post('/register', UserController.postRegister);

router.get('/map', (req, res) => res.render('map'))

router.get('/login', UserController.login);
router.post('/login', UserController.postLogin);

router.use('/users', users);

router.use('/products', products);

router.use('/admin', admin)

module.exports = router;