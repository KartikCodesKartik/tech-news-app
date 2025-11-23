import React, { useState, useEffect } from 'react';
import { articleService } from '../../services';
import './Admin.css';

const ArticleStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await articleService.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="article-stats">
      <h1>Article Statistics</h1>
      <p className="subtitle">View analytics by author</p>

      {stats.length === 0 ? (
        <p className="no-data">No statistics available</p>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Author</th>
                <th>Email</th>
                <th>Total Articles</th>
                <th>Published</th>
                <th>Total Views</th>
              </tr>
            </thead>
            <tbody>
              {stats.map(stat => (
                <tr key={stat._id}>
                  <td>{stat.authorName}</td>
                  <td>{stat.authorEmail}</td>
                  <td>{stat.totalArticles}</td>
                  <td>{stat.publishedArticles}</td>
                  <td><strong>{stat.totalViews}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ArticleStats;
