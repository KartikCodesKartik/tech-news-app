import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleService } from '../../services';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalViews: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await articleService.getAllArticles({ limit: 1000 });
      const articles = response.data;
      
      setStats({
        totalArticles: articles.length,
        publishedArticles: articles.filter(a => a.isPublished).length,
        draftArticles: articles.filter(a => !a.isPublished).length,
        totalViews: articles.reduce((sum, a) => sum + a.views, 0)
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name}!</h1>
      <p className="dashboard-subtitle">Manage your tech news articles and more</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Articles</h3>
          <p className="stat-number">{stats.totalArticles}</p>
        </div>
        <div className="stat-card">
          <h3>Published</h3>
          <p className="stat-number">{stats.publishedArticles}</p>
        </div>
        <div className="stat-card">
          <h3>Drafts</h3>
          <p className="stat-number">{stats.draftArticles}</p>
        </div>
        <div className="stat-card">
          <h3>Total Views</h3>
          <p className="stat-number">{stats.totalViews}</p>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/admin/articles/new" className="action-card">
            <h3>📝 Create Article</h3>
            <p>Write a new tech news article</p>
          </Link>
          <Link to="/admin/articles" className="action-card">
            <h3>📚 View Articles</h3>
            <p>Manage all your articles</p>
          </Link>
          {user?.role === 'admin' && (
            <>
              <Link to="/admin/editors" className="action-card">
                <h3>👥 Manage Editors</h3>
                <p>Add and manage editor accounts</p>
              </Link>
              <Link to="/admin/stats" className="action-card">
                <h3>📊 View Statistics</h3>
                <p>See detailed article analytics</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
