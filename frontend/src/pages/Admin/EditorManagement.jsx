import React, { useState, useEffect } from 'react';
import { userService, authService } from '../../services';
import './Admin.css';

const EditorManagement = () => {
  const [editors, setEditors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEditors();
  }, []);

  const fetchEditors = async () => {
    try {
      const response = await userService.getEditors();
      setEditors(response.data);
    } catch (error) {
      console.error('Failed to fetch editors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await authService.register({ ...formData, role: 'editor' });
      alert('Editor created successfully!');
      setFormData({ name: '', email: '', password: '' });
      setShowForm(false);
      fetchEditors();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create editor');
    }
  };

  const handleToggleStatus = async (editor) => {
    try {
      await userService.updateUser(editor._id, { isActive: !editor.isActive });
      alert(`Editor ${editor.isActive ? 'deactivated' : 'activated'} successfully`);
      fetchEditors();
    } catch (error) {
      alert('Failed to update editor status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this editor?')) {
      return;
    }

    try {
      await userService.deleteUser(id);
      alert('Editor deleted successfully');
      fetchEditors();
    } catch (error) {
      alert('Failed to delete editor');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="editor-management">
      <div className="list-header">
        <h1>Editor Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? 'Cancel' : 'Add New Editor'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>Create New Editor</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit} className="editor-form">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                className="form-input"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Create Editor
            </button>
          </form>
        </div>
      )}

      <div className="editors-list">
        <h2>All Editors ({editors.length})</h2>
        {editors.length === 0 ? (
          <p className="no-data">No editors found</p>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {editors.map(editor => (
                  <tr key={editor._id}>
                    <td>{editor.name}</td>
                    <td>{editor.email}</td>
                    <td>
                      <span className={`status-badge ${editor.isActive ? 'active' : 'inactive'}`}>
                        {editor.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>{new Date(editor.createdAt).toLocaleDateString()}</td>
                    <td className="actions">
                      <button
                        onClick={() => handleToggleStatus(editor)}
                        className="btn-small"
                      >
                        {editor.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDelete(editor._id)}
                        className="btn-small danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorManagement;
