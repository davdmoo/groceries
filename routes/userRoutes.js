const express = require('express');
const router = express.Router();
const Controller = require('../controllers/userController.js');

router.get('/register', Controller.getRegister);
router.post('/register', Controller.postRegister);

module.exports = router;