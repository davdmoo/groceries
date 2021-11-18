const express = require('express');
const router = express.Router();
const Controller = require('../controllers/adminController.js');

router.get('/', Controller.getProducts);

router.get('/users', Controller.getUsers);

router.get('/emptyList', Controller.getEmptyList);

router.get('/add', Controller.getAddProduct);
router.post('/add', Controller.postAddProduct);

router.get('/update/:id', Controller.getEditProduct);
router.post('/update/:id', Controller.postEditProduct);

router.get('/restock/:id', Controller.getRestockProduct);
router.post('/restock/:id', Controller.postRestockProduct);

router.get('/delete/:id', Controller.deleteProduct);

module.exports = router;