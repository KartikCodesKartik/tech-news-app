import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-brand">Tech News</Link>
          
          <div className="nav-menu">
            {isAuthenticated ? (
              <>
                {isAdminRoute && (
                  <>
                    <Link to="/admin" className="nav-link">Dashboard</Link>
                    <Link to="/admin/articles" className="nav-link">Articles</Link>
                    {user?.role === 'admin' && (
                      <>
                        <Link to="/admin/editors" className="nav-link">Editors</Link>
                        <Link to="/admin/stats" className="nav-link">Stats</Link>
                      </>
                    )}
                  </>
                )}
                <span className="nav-user">Welcome, {user?.name}</span>
                <button onClick={logout} className="nav-button">Logout</button>
              </>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>&copy; 2024 Tech News App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
