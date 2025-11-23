import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleService } from '../../services';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const ArticleList = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchArticles();
  }, [filter]);

  const fetchArticles = async () => {
    try {
      const params = {};
      if (filter === 'published') params.isPublished = true;
      if (filter === 'draft') params.isPublished = false;
      
      const response = await articleService.getAllArticles({ ...params, limit: 100 });
      setArticles(response.data);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      await articleService.deleteArticle(id);
      setArticles(articles.filter(a => a._id !== id));
      alert('Article deleted successfully');
    } catch (error) {
      alert('Failed to delete article');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="article-list">
      <div className="list-header">
        <h1>Articles</h1>
        <Link to="/admin/articles/new" className="btn btn-primary">
          Create New Article
        </Link>
      </div>

      <div className="filter-bar">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'published' ? 'active' : ''}`}
          onClick={() => setFilter('published')}
        >
          Published
        </button>
        <button
          className={`filter-btn ${filter === 'draft' ? 'active' : ''}`}
          onClick={() => setFilter('draft')}
        >
          Drafts
        </button>
      </div>

      {articles.length === 0 ? (
        <p className="no-data">No articles found</p>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Views</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article._id}>
                  <td>{article.title}</td>
                  <td>{article.category}</td>
                  <td>{article.author?.name || 'Unknown'}</td>
                  <td>{article.views}</td>
                  <td>
                    <span className={`status-badge ${article.isPublished ? 'published' : 'draft'}`}>
                      {article.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                  <td className="actions">
                    <Link to={`/admin/articles/edit/${article._id}`} className="btn-icon">
                      ✏️
                    </Link>
                    {(user?.role === 'admin' || article.author?._id === user?.id) && (
                      <button
                        onClick={() => handleDelete(article._id)}
                        className="btn-icon danger"
                      >
                        🗑️
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
