// ============================================
// МАРШРУТЫ АВТОРИЗАЦИИ
// ============================================
const express = require('express');
const router = express.Router();
const { auth } = require('../controllers/authController');

// POST /api/auth — авторизация/регистрация
router.post('/auth', auth);

module.exports = router;
