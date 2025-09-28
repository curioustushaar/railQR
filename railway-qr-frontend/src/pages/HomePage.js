import React from 'react';
import trainBg from "../assets/images/track.png";

const HomePage = ({ onGetStarted, user, onLogin, onLogout, onShowAbout, onShowContact, onShowFeatures, onShowQRScanner }) => {
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${trainBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      overflow: "hidden"
    },
    hero: {
      textAlign: "center",
      color: "white",
      maxWidth: "1200px",
      padding: "120px 20px 0 20px",
      animation: "fadeInUp 1s ease-out"
    },
    title: {
      fontSize: "4.5rem",
      fontWeight: "800",
      marginBottom: "20px",
      textShadow: "3px 6px 12px rgba(0, 0, 0, 0.9)",
      background: "linear-gradient(45deg, #fff, #ffeaa7, #fdcb6e)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      letterSpacing: "2px"
    },
    subtitle: {
      fontSize: "1.8rem",
      fontWeight: "500",
      marginBottom: "30px",
      textShadow: "2px 4px 8px rgba(0, 0, 0, 0.9)",
      opacity: "0.95"
    },
    description: {
      fontSize: "1.2rem",
      marginBottom: "40px",
      lineHeight: "1.8",
      textShadow: "1px 2px 6px rgba(0, 0, 0, 0.9)",
      opacity: "0.9",
      maxWidth: "800px",
      margin: "0 auto 40px auto"
    },
    buttonContainer: {
      display: "flex",
      gap: "25px",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: "30px"
    },
    primaryButton: {
      background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
      color: "white",
      padding: "18px 40px",
      border: "none",
      borderRadius: "50px",
      fontSize: "1.2rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 10px 30px rgba(0, 123, 255, 0.5)",
      textDecoration: "none",
      display: "inline-block"
    },
    secondaryButton: {
      background: "rgba(255, 255, 255, 0.15)",
      color: "white",
      padding: "18px 40px",
      border: "2px solid rgba(255, 255, 255, 0.9)",
      borderRadius: "50px",
      fontSize: "1.2rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      backdropFilter: "blur(15px)",
      textDecoration: "none",
      display: "inline-block"
    },
    features: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "35px",
      marginTop: "80px",
      width: "100%",
      maxWidth: "1200px"
    },
    featureCard: {
      background: "rgba(255, 255, 255, 0.12)",
      backdropFilter: "blur(15px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "25px",
      padding: "35px",
      textAlign: "center",
      color: "white",
      transition: "all 0.4s ease",
      minHeight: "280px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    featureIcon: {
      fontSize: "3.5rem",
      marginBottom: "20px",
      display: "block"
    },
    featureTitle: {
      fontSize: "1.4rem",
      fontWeight: "700",
      marginBottom: "15px",
      textShadow: "1px 2px 4px rgba(0, 0, 0, 0.8)"
    },
    featureDesc: {
      fontSize: "1rem",
      opacity: "0.9",
      lineHeight: "1.6",
      textShadow: "1px 1px 3px rgba(0, 0, 0, 0.8)"
    },
    navbar: {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      padding: "20px 50px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "rgba(0, 0, 0, 0.2)",
      backdropFilter: "blur(15px)",
      zIndex: "10",
      height: "70px"
    },
    logo: {
      fontSize: "1.8rem",
      fontWeight: "800",
      color: "white",
      textShadow: "2px 4px 8px rgba(0, 0, 0, 0.9)"
    },
    navLinks: {
      display: "flex",
      gap: "35px"
    },
    navLink: {
      color: "white",
      textDecoration: "none",
      fontSize: "1.1rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
      textShadow: "1px 2px 6px rgba(0, 0, 0, 0.9)"
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      color: 'white'
    },
    welcomeText: {
      fontSize: '1rem',
      fontWeight: '600'
    },
    logoutBtn: {
      background: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '0.9rem'
    }
  };

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>
          🚂 Railway QR System
        </div>
        <div style={styles.navLinks}>
          {user ? (
            <div style={styles.userInfo}>
              <span style={styles.welcomeText}>
                Welcome, {user.name} ({user.role})
              </span>
              <button style={styles.logoutBtn} onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <button 
                style={{...styles.navLink, background: 'none', border: 'none', cursor: 'pointer'}}
                onClick={onShowAbout}
              >
                About
              </button>
              <button 
                style={{...styles.navLink, background: 'none', border: 'none', cursor: 'pointer'}}
                onClick={onShowFeatures}
              >
                Features
              </button>
              <button 
                style={{...styles.navLink, background: 'none', border: 'none', cursor: 'pointer'}}
                onClick={onShowContact}
              >
                Contact
              </button>
              <button 
                style={{...styles.navLink, background: 'none', border: 'none', cursor: 'pointer'}}
                onClick={onShowQRScanner}
              >
                📱 QR Scanner
              </button>
              <button 
                style={{...styles.navLink, background: 'none', border: 'none', cursor: 'pointer'}}
                onClick={onLogin}
              >
                Login
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          🚂 Railway QR Management System
        </h1>
        <p style={styles.subtitle}>
          Smart Component Tracking & Quality Assurance for Indian Railways
        </p>
        <p style={styles.description}>
          Revolutionize your railway component management with our advanced QR-based tracking system. 
          Monitor, track, and maintain railway components with unprecedented accuracy and efficiency using 
          cutting-edge laser marking technology specifically designed for Indian Railway infrastructure.
        </p>
        
        <div style={styles.buttonContainer}>
          <button 
            style={styles.primaryButton}
            onClick={onGetStarted}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-4px)";
              e.target.style.boxShadow = "0 15px 40px rgba(0, 123, 255, 0.7)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 10px 30px rgba(0, 123, 255, 0.5)";
            }}
          >
            🚀 Get Started
          </button>
          
          <button 
            style={styles.secondaryButton}
            onClick={onShowFeatures}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(239, 152, 12, 0.25)";
              e.target.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.15)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            📖 Learn More
          </button>
        </div>

        {/* Features Section - Now with 4 cards */}
        <div style={styles.features}>
          <div 
            style={{...styles.featureCard, cursor: 'pointer'}}
            onClick={onShowQRScanner}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-15px) scale(1.02)";
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
              e.target.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.background = "rgba(255, 255, 255, 0.12)";
              e.target.style.boxShadow = "none";
            }}
          >
            <span style={styles.featureIcon}>📱</span>
            <h3 style={styles.featureTitle}>QR Code Scanner</h3>
            <p style={styles.featureDesc}>
              Click here to scan QR codes for instant component identification and detailed information access
            </p>
          </div>

          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-15px) scale(1.02)";
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
              e.target.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.background = "rgba(255, 255, 255, 0.12)";
              e.target.style.boxShadow = "none";
            }}
          >
            <span style={styles.featureIcon}>🔍</span>
            <h3 style={styles.featureTitle}>Quality Inspection</h3>
            <p style={styles.featureDesc}>
              Comprehensive inspection history and quality assurance tracking with digital reporting systems
            </p>
          </div>

          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-15px) scale(1.02)";
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
              e.target.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.background = "rgba(255, 255, 255, 0.12)";
              e.target.style.boxShadow = "none";
            }}
          >
            <span style={styles.featureIcon}>📊</span>
            <h3 style={styles.featureTitle}>Real-time Analytics</h3>
            <p style={styles.featureDesc}>
              Monitor component lifecycle, warranty status, and maintenance schedules with advanced dashboard analytics
            </p>
          </div>

          {/* New 4th Card - Laser Marking */}
          {/*<div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-15px) scale(1.02)";
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
              e.target.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.background = "rgba(255, 255, 255, 0.12)";
              e.target.style.boxShadow = "none";
            }}
          >
            <span style={styles.featureIcon}>🔥</span>
            <h3 style={styles.featureTitle}>Laser QR Marking</h3>
            <p style={styles.featureDesc}>
              Advanced laser-based QR code marking on track fittings for Indian Railways with permanent, weather-resistant identification
            </p>
          </div>*/}
        </div>
      </div>

      {/* CSS Keyframes for Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 1024px) {
          .features {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 768px) {
          .title {
            font-size: 3rem !important;
          }
          .subtitle {
            font-size: 1.4rem !important;
          }
          .features {
            grid-template-columns: 1fr !important;
            margin-top: 60px !important;
            gap: 25px !important;
          }
          .buttonContainer {
            flex-direction: column !important;
            align-items: center !important;
          }
          .navLinks {
            display: none !important;
          }
          .navbar {
            padding: 15px 25px !important;
            height: 60px !important;
          }
          .hero {
            padding: 100px 20px 0 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;