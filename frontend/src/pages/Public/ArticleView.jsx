import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { articleService } from '../../services';
import './Public.css';

const ArticleView = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await articleService.getArticle(id);
      setArticle(response.data);
    } catch (error) {
      console.error('Failed to fetch article:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!article) return <div className="error">Article not found</div>;

  return (
    <div className="article-view">
      <Link to="/" className="back-link">← Back to Home</Link>
      
      <article className="article-full">
        <header className="article-header">
          <span className="article-category">{article.category}</span>
          <h1>{article.title}</h1>
          <div className="article-meta">
            <span>By {article.author?.name}</span>
            <span>•</span>
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>{article.views} views</span>
          </div>
          {article.tags && article.tags.length > 0 && (
            <div className="article-tags">
              {article.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </header>

        {article.imageUrl && (
          <img src={article.imageUrl} alt={article.title} className="article-featured-image" />
        )}

        <div className="article-body">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default ArticleView;
