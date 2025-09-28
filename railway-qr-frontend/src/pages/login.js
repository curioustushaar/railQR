import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "vendor"
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // For demo purposes, using mock authentication
      if (formData.email === "admin@test.com" && formData.password === "admin") {
        onLogin({ email: formData.email, name: "Admin User" }, "admin");
      } else if (formData.email === "vendor@test.com" && formData.password === "vendor") {
        onLogin({ email: formData.email, name: "Vendor User" }, "vendor");
      } else if (formData.email === "inspector@test.com" && formData.password === "inspector") {
        onLogin({ email: formData.email, name: "Inspector User" }, "inspector");
      } else {
        // Try backend connection
        try {
          const res = await axios.post("http://localhost:5002/api/auth/login", {
            email: formData.email,
            password: formData.password,
          });
          onLogin({ email: formData.email, name: res.data.name }, res.data.role);
        } catch (err) {
          alert("Invalid credentials! Use demo accounts:\n- admin@test.com / admin\n- vendor@test.com / vendor\n- inspector@test.com / inspector");
        }
      }
    } catch (err) {
      alert("Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // For demo purposes
      alert("Registration successful! You can now login with:\nEmail: " + formData.email + "\nPassword: " + formData.password);
      setIsLogin(true);
    } catch (err) {
      alert("Registration failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    },
    card: {
      background: "white",
      borderRadius: "15px",
      padding: "40px",
      minWidth: "400px",
      boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px"
    },
    title: {
      color: "#333",
      marginBottom: "20px",
      fontSize: "28px"
    },
    tabButtons: {
      display: "flex",
      marginBottom: "20px"
    },
    tabButton: {
      flex: 1,
      padding: "10px",
      border: "none",
      background: "#f8f9fa",
      cursor: "pointer",
      borderRadius: "5px",
      margin: "0 5px"
    },
    activeTab: {
      background: "#007bff",
      color: "white"
    },
    form: {
      display: "flex",
      flexDirection: "column"
    },
    formGroup: {
      marginBottom: "20px"
    },
    label: {
      display: "block",
      marginBottom: "5px",
      color: "#555",
      fontWeight: "bold"
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "2px solid #e1e5e9",
      borderRadius: "8px",
      fontSize: "16px",
      transition: "border-color 0.3s",
      boxSizing: "border-box"
    },
    submitBtn: {
      padding: "15px",
      background: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background 0.3s"
    },
    demoAccounts: {
      marginTop: "30px",
      padding: "15px",
      background: "#f8f9fa",
      borderRadius: "8px",
      fontSize: "14px"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Railway QR System</h2>
          <div style={styles.tabButtons}>
            <button 
              style={{...styles.tabButton, ...(isLogin ? styles.activeTab : {})}}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              style={{...styles.tabButton, ...(!isLogin ? styles.activeTab : {})}}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleRegister} style={styles.form}>
          {!isLogin && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                style={styles.input}
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
              />
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {!isLogin && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Role</label>
              <select
                style={styles.input}
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="vendor">Vendor</option>
                <option value="inspector">Inspector</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "Processing..." : (isLogin ? "Login" : "Register")}
          </button>
        </form>

        {/*isLogin && (
          <div style={styles.demoAccounts}>
            <h4>Demo Accounts:</h4>
            <p><strong>Admin:</strong> admin@test.com / admin</p>
            <p><strong>Vendor:</strong> vendor@test.com / vendor</p>
            <p><strong>Inspector:</strong> inspector@test.com / inspector</p>
          </div>
        )*/}
      </div>
    </div>
  );
};

export default Login;
