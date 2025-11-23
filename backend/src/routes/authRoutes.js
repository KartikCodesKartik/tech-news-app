const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', protect, authorize('admin'), register);
router.post('/login', authLimiter, login);
router.get('/me', protect, getMe);
router.post('/forgot-password', authLimiter, forgotPassword);
router.put('/reset-password/:resetToken', authLimiter, resetPassword);

module.exports = router;
