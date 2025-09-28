import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Register = ({ onSwitchToLogin, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'vendor'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const result = await register(formData.name, formData.email, formData.password, formData.role);
    
    if (result.success) {
      onClose();
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modal: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '40px',
      width: '100%',
      maxWidth: '450px',
      margin: '20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#333',
      marginBottom: '10px'
    },
    subtitle: {
      color: '#666',
      fontSize: '1rem'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#333'
    },
    input: {
      padding: '15px',
      border: '2px solid #e1e5e9',
      borderRadius: '10px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      outline: 'none'
    },
    select: {
      padding: '15px',
      border: '2px solid #e1e5e9',
      borderRadius: '10px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      outline: 'none',
      backgroundColor: 'white'
    },
    button: {
      background: 'linear-gradient(135deg, #28a745 0%, #20692e 100%)',
      color: 'white',
      padding: '15px',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
      marginTop: '10px'
    },
    error: {
      color: '#dc3545',
      fontSize: '0.9rem',
      textAlign: 'center',
      padding: '10px',
      backgroundColor: '#f8d7da',
      borderRadius: '5px',
      border: '1px solid #f5c6cb'
    },
    footer: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '0.9rem',
      color: '#666'
    },
    link: {
      color: '#007bff',
      cursor: 'pointer',
      textDecoration: 'none',
      fontWeight: '600'
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#666'
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>×</button>
        
        <div style={styles.header}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join Railway QR System</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
              placeholder="Enter your email"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="vendor">Vendor</option>
              <option value="inspector">Inspector</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
              placeholder="Enter your password (min 6 characters)"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              required
              placeholder="Confirm your password"
            />
          </div>

          <button 
            type="submit" 
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={styles.footer}>
          Already have an account?{' '}
          <span style={styles.link} onClick={onSwitchToLogin}>
            Sign in here
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;