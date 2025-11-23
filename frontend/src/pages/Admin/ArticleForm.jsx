import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { articleService } from '../../services';
import './Admin.css';

const ArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    imageUrl: '',
    isPublished: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await articleService.getArticle(id);
      const article = response.data;
      setFormData({
        title: article.title,
        content: article.content,
        excerpt: article.excerpt || '',
        category: article.category,
        tags: article.tags?.join(', ') || '',
        imageUrl: article.imageUrl || '',
        isPublished: article.isPublished
      });
    } catch (error) {
      setError('Failed to fetch article');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      if (isEdit) {
        await articleService.updateArticle(id, submitData);
        alert('Article updated successfully!');
      } else {
        await articleService.createArticle(submitData);
        alert('Article created successfully!');
      }
      navigate('/admin/articles');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="article-form-container">
      <h1>{isEdit ? 'Edit Article' : 'Create New Article'}</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows="2"
            className="form-input"
            placeholder="Short summary of the article"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="15"
            className="form-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="e.g., AI, Web Development"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., JavaScript, React, Node.js"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="form-input"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
            />
            <span>Publish immediately</span>
          </label>
          <small>If unchecked, article will be saved as draft</small>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/articles')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Saving...' : isEdit ? 'Update Article' : 'Create Article'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
