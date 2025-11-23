import api from './api';

// Auth services
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token, password) => {
    const response = await api.put(`/auth/reset-password/${token}`, { password });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// User services
export const userService = {
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  getEditors: async () => {
    const response = await api.get('/users/editors');
    return response.data;
  },

  getUser: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};

// Article services
export const articleService = {
  getAllArticles: async (params = {}) => {
    const response = await api.get('/articles', { params });
    return response.data;
  },

  getArticle: async (id) => {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  },

  createArticle: async (articleData) => {
    const response = await api.post('/articles', articleData);
    return response.data;
  },

  updateArticle: async (id, articleData) => {
    const response = await api.put(`/articles/${id}`, articleData);
    return response.data;
  },

  deleteArticle: async (id) => {
    const response = await api.delete(`/articles/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/articles/stats/views');
    return response.data;
  }
};

// Newsletter services
export const newsletterService = {
  subscribe: async (email) => {
    const response = await api.post('/newsletter/subscribe', { email });
    return response.data;
  },

  unsubscribe: async (email) => {
    const response = await api.post('/newsletter/unsubscribe', { email });
    return response.data;
  },

  getAllSubscribers: async () => {
    const response = await api.get('/newsletter/subscribers');
    return response.data;
  }
};
