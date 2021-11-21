const express = require('express');
const router = express.Router();
const users = require('./userRoutes.js');
const products = require('./productRoutes.js');
const admin = require('./adminRoutes.js');
const ProductController = require('../controllers/productController');
const UserController = require('../controllers/userController');

router.get('/register', UserController.getRegister);
router.post('/register', UserController.postRegister);

router.get('/map', (req, res) => res.render('map'))

router.get('/login', UserController.login);
router.post('/login', UserController.postLogin);

router.get('/logout', UserController.logout);

router.get('/', ProductController.getProducts);

router.use( function(req,res,next) {
    // console.log(req.session);
    if(!req.session.userId) {
        const error = `Please login first!`
        res.redirect(`/login?error=${error}`)
    } else{
        next()
    }
})

router.use('/products', products);

router.use( function(req,res,next) {
    // console.log(req.session);
    if (req.session.userId && req.session.role !== 'admin') {
        const error = `You don't have admin privileges`
        res.redirect(`/?error=${error}`)
    } else{
        next()
    }
})

router.use('/users', users);

router.use('/admin', admin);

module.exports = router;