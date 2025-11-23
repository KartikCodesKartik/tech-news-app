const Article = require('../models/Article');
const Newsletter = require('../models/Newsletter');
const { sendNewsletterEmail } = require('../utils/emailService');

// @desc    Create new article
// @route   POST /api/articles
// @access  Private (Admin/Editor)
exports.createArticle = async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, imageUrl, isPublished } = req.body;

    const article = await Article.create({
      title,
      content,
      excerpt,
      category,
      tags,
      imageUrl,
      isPublished,
      author: req.user._id,
      publishedAt: isPublished ? new Date() : null
    });

    // Send newsletter if published
    if (isPublished) {
      const subscribers = await Newsletter.find({ isActive: true });
      for (const subscriber of subscribers) {
        try {
          await sendNewsletterEmail(subscriber.email, article);
        } catch (emailError) {
          console.error(`Failed to send newsletter to ${subscriber.email}:`, emailError);
        }
      }
    }

    res.status(201).json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all articles
// @route   GET /api/articles
// @access  Public
exports.getAllArticles = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, isPublished, search } = req.query;

    const query = {};

    if (category) query.category = category;
    if (typeof isPublished !== 'undefined') query.isPublished = isPublished === 'true';
    if (search) {
      query.$text = { $search: search };
    }

    const articles = await Article.find(query)
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Article.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: articles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single article
// @route   GET /api/articles/:id
// @access  Public
exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'name email');

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    // Increment views
    article.views += 1;
    await article.save();

    res.status(200).json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update article
// @route   PUT /api/articles/:id
// @access  Private (Admin/Editor - own articles)
exports.updateArticle = async (req, res) => {
  try {
    let article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    // Check if user is the author or admin
    if (article.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this article'
      });
    }

    const { title, content, excerpt, category, tags, imageUrl, isPublished } = req.body;

    // Update fields
    if (title) article.title = title;
    if (content) article.content = content;
    if (excerpt) article.excerpt = excerpt;
    if (category) article.category = category;
    if (tags) article.tags = tags;
    if (imageUrl !== undefined) article.imageUrl = imageUrl;
    
    // Handle publication status change
    if (typeof isPublished !== 'undefined') {
      const wasPublished = article.isPublished;
      article.isPublished = isPublished;
      
      // If publishing for the first time
      if (!wasPublished && isPublished) {
        article.publishedAt = new Date();
        
        // Send newsletter
        const subscribers = await Newsletter.find({ isActive: true });
        for (const subscriber of subscribers) {
          try {
            await sendNewsletterEmail(subscriber.email, article);
          } catch (emailError) {
            console.error(`Failed to send newsletter to ${subscriber.email}:`, emailError);
          }
        }
      }
    }

    await article.save();

    res.status(200).json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete article
// @route   DELETE /api/articles/:id
// @access  Private (Admin/Editor - own articles)
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    // Check if user is the author or admin
    if (article.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this article'
      });
    }

    await article.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Article deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get article statistics
// @route   GET /api/articles/stats/views
// @access  Private (Admin)
exports.getArticleStats = async (req, res) => {
  try {
    const stats = await Article.aggregate([
      {
        $group: {
          _id: '$author',
          totalArticles: { $sum: 1 },
          totalViews: { $sum: '$views' },
          publishedArticles: {
            $sum: { $cond: ['$isPublished', 1, 0] }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'authorInfo'
        }
      },
      {
        $unwind: '$authorInfo'
      },
      {
        $project: {
          _id: 1,
          authorName: '$authorInfo.name',
          authorEmail: '$authorInfo.email',
          totalArticles: 1,
          totalViews: 1,
          publishedArticles: 1
        }
      },
      {
        $sort: { totalViews: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
