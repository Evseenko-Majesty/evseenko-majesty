const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/user', userController.getUser);
router.get('/balance/:telegram_id', userController.getBalance);

module.exports = router;
