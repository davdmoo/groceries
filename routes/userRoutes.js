const express = require('express');
const router = express.Router();
const Controller = require('../controllers/userController.js');

router.get('/profile/:id', Controller.userProfile)

module.exports = router;