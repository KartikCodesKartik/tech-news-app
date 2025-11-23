const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getEditors
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.get('/', getAllUsers);
router.get('/editors', getEditors);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
