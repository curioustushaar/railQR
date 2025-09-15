import React, { useState } from 'react';

const LoginPage = ({ onLogin, onBackToHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('vendor'); // 'vendor', 'inspector', 'admin'

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    },
    loginCard: {
      background: "rgba(255, 255, 255, 0.95)",
      borderRadius: "20px",
      padding: "40px",
      maxWidth: "450px",
      width: "100%",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      position: "relative"
    },
    backButton: {
      position: "absolute",
      top: "20px",
      left: "20px",
      background: "transparent",
      border: "none",
      fontSize: "1.5rem",
      cursor: "pointer",
      color: "#495057",
      transition: "all 0.3s ease"
    },
    title: {
      textAlign: "center",
      fontSize: "2.2rem",
      fontWeight: "700",
      marginBottom: "10px",
      color: "#495057"
    },
    subtitle: {
      textAlign: "center",
      fontSize: "1rem",
      color: "#6c757d",
      marginBottom: "30px"
    },
    userTypeContainer: {
      display: "flex",
      gap: "10px",
      marginBottom: "25px",
      justifyContent: "center"
    },
    userTypeButton: {
      padding: "10px 20px",
      border: "2px solid #e9ecef",
      borderRadius: "25px",
      background: "transparent",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "all 0.3s ease"
    },
    activeUserType: {
      background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
      color: "white",
      border: "2px solid #007bff"
    },
    formGroup: {
      marginBottom: "20px"
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
      color: "#495057",
      fontSize: "14px"
    },
    input: {
      width: "100%",
      padding: "15px",
      border: "2px solid #e9ecef",
      borderRadius: "10px",
      fontSize: "1rem",
      boxSizing: "border-box",
      transition: "all 0.3s ease",
      backgroundColor: "rgba(255, 255, 255, 0.9)"
    },
    button: {
      width: "100%",
      padding: "15px",
      background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "1.1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 8px 25px rgba(0, 123, 255, 0.3)",
      marginTop: "20px"
    },
    demoCredentials: {
      background: "#f8f9fa",
      padding: "15px",
      borderRadius: "10px",
      marginTop: "20px",
      fontSize: "12px",
      color: "#495057"
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock authentication - in real app, you would validate credentials
    const userData = {
      email: email,
      name: getUserName(userType),
      type: userType
    };
    
    onLogin(userData);
  };

  const getUserName = (type) => {
    switch(type) {
      case 'vendor': return 'Demo Vendor';
      case 'inspector': return 'Quality Inspector';
      case 'admin': return 'System Admin';
      default: return 'User';
    }
  };

  const getDemoCredentials = (type) => {
    switch(type) {
      case 'vendor': 
        return { email: 'vendor@railway.com', password: 'vendor123' };
      case 'inspector': 
        return { email: 'inspector@railway.com', password: 'inspector123' };
      case 'admin': 
        return { email: 'admin@railway.com', password: 'admin123' };
      default: 
        return { email: '', password: '' };
    }
  };

  const fillDemoCredentials = () => {
    const creds = getDemoCredentials(userType);
    setEmail(creds.email);
    setPassword(creds.password);
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <button 
          style={styles.backButton}
          onClick={onBackToHome}
          onMouseEnter={(e) => {
            e.target.style.color = "#007bff";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#495057";
            e.target.style.transform = "scale(1)";
          }}
        >
          ← Back
        </button>

        <h2 style={styles.title}>🚂 Login to RailQR</h2>
        <p style={styles.subtitle}>Access your dashboard</p>

        {/* User Type Selection */}
        <div style={styles.userTypeContainer}>
          {['vendor', 'inspector', 'admin'].map((type) => (
            <button
              key={type}
              style={{
                ...styles.userTypeButton,
                ...(userType === type ? styles.activeUserType : {})
              }}
              onClick={() => setUserType(type)}
            >
              {type === 'vendor' && '🏭'} 
              {type === 'inspector' && '🔍'} 
              {type === 'admin' && '⚙️'} 
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>📧 Email Address</label>
            <input
              style={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = "#007bff";
                e.target.style.boxShadow = "0 0 0 3px rgba(0, 123, 255, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e9ecef";
                e.target.style.boxShadow = "none";
              }}
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>🔒 Password</label>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = "#007bff";
                e.target.style.boxShadow = "0 0 0 3px rgba(0, 123, 255, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e9ecef";
                e.target.style.boxShadow = "none";
              }}
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 12px 35px rgba(0, 123, 255, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 25px rgba(0, 123, 255, 0.3)";
            }}
          >
            🚀 Login to Dashboard
          </button>
        </form>

        {/* Demo Credentials */}
        <div style={styles.demoCredentials}>
          <strong>Demo Credentials for {userType}:</strong><br/>
          Email: {getDemoCredentials(userType).email}<br/>
          Password: {getDemoCredentials(userType).password}<br/>
          <button 
            style={{
              background: "#007bff",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              fontSize: "12px",
              cursor: "pointer",
              marginTop: "8px"
            }}
            onClick={fillDemoCredentials}
          >
            Fill Demo Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;