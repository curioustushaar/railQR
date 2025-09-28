import React, { useState } from 'react';
import './LoginComponent.css'; // Assuming you have some CSS for styling

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // ...existing login logic...
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      {error && (
        <div className="error-message">
          <i className="error-icon">⚠️</i>
          {error}
        </div>
      )}

      {/* Remove or comment out the demo accounts section */}
      {/* 
      <div className="demo-accounts">
        <h3>Demo Accounts:</h3>
        <p>Admin: admin@test.com / admin</p>
        <p>Vendor: vendor@test.com / vendor</p>
        <p>Inspector: inspector@test.com / inspector</p>
      </div>
      */}
    </div>
  );
};

export default LoginComponent;