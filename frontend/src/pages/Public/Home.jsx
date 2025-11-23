import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleService, newsletterService } from '../../services';
import './Public.css';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await articleService.getAllArticles({ isPublished: true, limit: 20 });
      setArticles(response.data);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await newsletterService.subscribe(email);
      setSubscribeMessage('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      setSubscribeMessage(error.response?.data?.message || 'Failed to subscribe');
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>Tech News</h1>
        <p>Stay updated with the latest in technology</p>
      </div>

      <div className="newsletter-section">
        <h2>Subscribe to Our Newsletter</h2>
        <form onSubmit={handleSubscribe} className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="newsletter-input"
          />
          <button type="submit" className="btn btn-primary">Subscribe</button>
        </form>
        {subscribeMessage && <p className="subscribe-message">{subscribeMessage}</p>}
      </div>

      <div className="articles-section">
        <h2>Latest Articles</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : articles.length === 0 ? (
          <p className="no-articles">No articles available yet</p>
        ) : (
          <div className="articles-grid">
            {articles.map(article => (
              <article key={article._id} className="article-card">
                {article.imageUrl && (
                  <img src={article.imageUrl} alt={article.title} className="article-image" />
                )}
                <div className="article-content">
                  <span className="article-category">{article.category}</span>
                  <h3>{article.title}</h3>
                  <p className="article-excerpt">
                    {article.excerpt || (article.content ? article.content.substring(0, 150) + '...' : 'No content available')}
                  </p>
                  <div className="article-meta">
                    <span>By {article.author?.name}</span>
                    <span>{article.views} views</span>
                  </div>
                  <Link to={`/article/${article._id}`} className="read-more">
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
