// API service for component management
const API_BASE_URL = 'http://localhost:5002/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// API headers with authentication
const getHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Component API functions
export const componentAPI = {
  // Get all components for current user
  getAllComponents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/components`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Get components error:', error);
      throw error;
    }
  },

  // Add new component
  addComponent: async (componentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/components`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(componentData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Add component error:', error);
      throw error;
    }
  },

  // Search component by batch ID
  searchComponent: async (batchId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/components/search/${batchId}`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Search component error:', error);
      throw error;
    }
  },

  // Update component
  updateComponent: async (componentId, updateData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/components/${componentId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updateData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Update component error:', error);
      throw error;
    }
  },

  // Delete component
  deleteComponent: async (componentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/components/${componentId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Delete component error:', error);
      throw error;
    }
  },

  // Get database status (admin)
  getDatabaseStatus: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/components/admin/status`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Get database status error:', error);
      throw error;
    }
  },

  // Get all components from all users (Admin only)
  getAllComponentsAdmin: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/components/admin/all`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Get all components (admin) error:', error);
      throw error;
    }
  }
};

// Auth API functions
export const authAPI = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Register user
  register: async (name, email, password, role = 'vendor') => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Token verification error:', error);
      throw error;
    }
  }
};

export default { componentAPI, authAPI };