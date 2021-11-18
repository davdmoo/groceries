const express = require('express');
const router = express.Router();
const Controller = require('../controllers/adminController.js');

router.get('/', Controller.getEmptyList);

router.get('/update/:id', (req, res) => res.send('edit product page'));
router.post('/update/:id', (req, res) => res.send('post edit product page'));

router.get('/restock/:id', Controller.getRestockProduct);
router.post('/restock/:id', Controller.postRestockProduct);

router.get('/delete/:id', (req, res) => res.send('delete product page'));

module.exports = router;