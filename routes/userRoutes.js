const express = require('express');
const router = express.Router();
const Controller = require('../controllers/userController.js');

router.use('/', (req, res) => res.send('users list'));

router.use('/update/:id', (req, res) => res.send('update profile page'));
router.post('/update/:id', (req, res) => res.send('post edit profile page'));

router.use('/delete/:id', (req, res) => res.send('delete profile page'));

module.exports = router;