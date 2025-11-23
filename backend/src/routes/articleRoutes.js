const express = require('express');
const router = express.Router();
const {
  createArticle,
  getAllArticles,
  getArticle,
  updateArticle,
  deleteArticle,
  getArticleStats
} = require('../controllers/articleController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllArticles);
router.get('/stats/views', protect, authorize('admin'), getArticleStats);
router.get('/:id', getArticle);

// Protected routes
router.post('/', protect, authorize('admin', 'editor'), createArticle);
router.put('/:id', protect, authorize('admin', 'editor'), updateArticle);
router.delete('/:id', protect, authorize('admin', 'editor'), deleteArticle);

module.exports = router;
