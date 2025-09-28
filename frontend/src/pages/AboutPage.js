import React from 'react';
import trainBg from "../assets/images/track.png";

const AboutPage = ({ onClose, onLogin }) => {
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
      zIndex: 1000,
      padding: '20px',
      overflow: 'auto'
    },
    container: {
      background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${trainBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '20px',
      width: '100%',
      maxWidth: '1000px',
      maxHeight: '90vh',
      color: 'white',
      position: 'relative',
      overflow: 'auto',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
    },
    header: {
      padding: '40px 40px 20px 40px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      margin: 0,
      background: 'linear-gradient(45deg, #fff, #f0f8ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    closeBtn: {
      background: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      color: 'white',
      fontSize: '1.5rem',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    },
    content: {
      padding: '40px',
      lineHeight: '1.8'
    },
    section: {
      marginBottom: '40px'
    },
    sectionTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '20px',
      color: '#87CEEB',
      borderLeft: '4px solid #007bff',
      paddingLeft: '15px'
    },
    paragraph: {
      fontSize: '1.1rem',
      marginBottom: '20px',
      opacity: '0.95'
    },
    highlight: {
      background: 'rgba(0, 123, 255, 0.2)',
      padding: '2px 8px',
      borderRadius: '4px',
      fontWeight: '600'
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
      marginTop: '30px'
    },
    featureCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '25px',
      borderRadius: '15px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)'
    },
    featureTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      marginBottom: '10px',
      color: '#87CEEB'
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginTop: '30px'
    },
    statCard: {
      background: 'rgba(0, 123, 255, 0.2)',
      padding: '25px',
      borderRadius: '15px',
      textAlign: 'center',
      border: '1px solid rgba(0, 123, 255, 0.3)'
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: '#87CEEB',
      display: 'block'
    },
    statLabel: {
      fontSize: '1rem',
      opacity: '0.9'
    },
    team: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '25px',
      marginTop: '30px'
    },
    teamCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '25px',
      borderRadius: '15px',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    teamImage: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'linear-gradient(45deg, #007bff, #87CEEB)',
      margin: '0 auto 15px auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem'
    },
    teamName: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '5px'
    },
    teamRole: {
      fontSize: '1rem',
      opacity: '0.8',
      color: '#87CEEB'
    },
    loginPrompt: {
      background: 'rgba(0, 123, 255, 0.2)',
      padding: '25px',
      borderRadius: '15px',
      textAlign: 'center',
      marginTop: '30px',
      border: '1px solid rgba(0, 123, 255, 0.3)'
    },
    loginBtn: {
      background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
      color: 'white',
      padding: '12px 30px',
      border: 'none',
      borderRadius: '25px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '15px'
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.container} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h1 style={styles.title}>🚂 About Railway QR System</h1>
          <button 
            style={styles.closeBtn} 
            onClick={onClose}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            ✕
          </button>
        </div>
        
        <div style={styles.content}>
          {/* Introduction */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🎯 Our Mission</h2>
            <p style={styles.paragraph}>
              The <span style={styles.highlight}>Railway QR Management System</span> is a cutting-edge digital solution 
              designed specifically for Indian Railways to revolutionize component tracking, quality assurance, and 
              maintenance management. Our system leverages advanced QR code technology with laser marking capabilities 
              to provide unprecedented visibility into railway infrastructure components.
            </p>
            <p style={styles.paragraph}>
              We aim to enhance railway safety, reduce maintenance costs, and improve operational efficiency through 
              smart digital tracking solutions that seamlessly integrate with existing railway operations.
            </p>
          </div>

          {/* Key Features */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>⚡ Key Features</h2>
            <div style={styles.features}>
              <div style={styles.featureCard}>
                <h3 style={styles.featureTitle}>🔥 Laser QR Marking</h3>
                <p>Advanced laser-based permanent QR code marking on track fittings and components, designed to withstand harsh railway environments.</p>
              </div>
              <div style={styles.featureCard}>
                <h3 style={styles.featureTitle}>📱 Mobile Scanning</h3>
                <p>Real-time component identification and data access through mobile QR scanning with offline capability for remote locations.</p>
              </div>
              <div style={styles.featureCard}>
                <h3 style={styles.featureTitle}>📊 Analytics Dashboard</h3>
                <p>Comprehensive analytics and reporting for component lifecycle management, maintenance scheduling, and quality tracking.</p>
              </div>
              <div style={styles.featureCard}>
                <h3 style={styles.featureTitle}>🔐 Multi-Role Access</h3>
                <p>Secure role-based access for Vendors, Inspectors, and Administrators with customized dashboards and permissions.</p>
              </div>
              <div style={styles.featureCard}>
                <h3 style={styles.featureTitle}>🌐 Cloud Integration</h3>
                <p>Centralized cloud-based data management with real-time synchronization across all railway divisions and zones.</p>
              </div>
              <div style={styles.featureCard}>
                <h3 style={styles.featureTitle}>📋 Quality Assurance</h3>
                <p>Digital inspection reports, warranty tracking, and compliance management with automated alert systems.</p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🛠️ Technology Stack</h2>
            <p style={styles.paragraph}>
              Our system is built using modern, reliable technologies:
            </p>
            <div style={styles.features}>
              <div style={styles.featureCard}>
                <h3 style={styles.featureTitle}>Frontend</h3>
                <p>React.js, Modern CSS3, Progressive Web App (PWA) capabilities for offline functionality</p>
              </div>
              <div style={styles.featureCard}>
                <h3 style={styles.featureTitle}>Backend</h3>
                <p>Node.js, Express.js, RESTful APIs, JWT Authentication, MongoDB for scalable data storage</p>
              </div>
              <div style={styles.featureCard}>
                <h3 style={styles.featureTitle}>QR Technology</h3>
                <p>High-density QR codes, Error correction, Laser marking compatibility, Weather-resistant encoding</p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📈 Impact & Statistics</h2>
            <div style={styles.stats}>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>99.9%</span>
                <span style={styles.statLabel}>System Uptime</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>50+</span>
                <span style={styles.statLabel}>Railway Stations</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>10K+</span>
                <span style={styles.statLabel}>Components Tracked</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>24/7</span>
                <span style={styles.statLabel}>Support Available</span>
              </div>
            </div>
          </div>

          {/* Our Team */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>👥 Our Team</h2>
            <p style={styles.paragraph}>
              Our dedicated team of railway engineers, software developers, and quality assurance specialists 
              work together to deliver world-class solutions for Indian Railways.
            </p>
            <div style={styles.team}>
              <div style={styles.teamCard}>
                <div style={styles.teamImage}>👨‍💼</div>
                <div style={styles.teamName}>Railway Engineering Team</div>
                <div style={styles.teamRole}>Domain Experts & Consultants</div>
              </div>
              <div style={styles.teamCard}>
                <div style={styles.teamImage}>👩‍💻</div>
                <div style={styles.teamName}>Software Development</div>
                <div style={styles.teamRole}>Full-Stack Developers</div>
              </div>
              <div style={styles.teamCard}>
                <div style={styles.teamImage}>🔬</div>
                <div style={styles.teamName}>Quality Assurance</div>
                <div style={styles.teamRole}>Testing & Validation</div>
              </div>
              <div style={styles.teamCard}>
                <div style={styles.teamImage}>🛠️</div>
                <div style={styles.teamName}>Technical Support</div>
                <div style={styles.teamRole}>24/7 Customer Support</div>
              </div>
              <div style={styles.teamCard}>
                <div style={styles.teamImage}>👩‍💻</div>
                <div style={styles.teamName}>Hardware Development</div>
                <div style={styles.teamRole}>QR Laser Integration</div>
              </div>
              <div style={styles.teamCard}>
                <div style={styles.teamImage}>👩‍💻</div>
                <div style={styles.teamName}>Software Development</div>
                <div style={styles.teamRole}>Mern-Stack Developers</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div style={styles.loginPrompt}>
            <h3 style={{margin: '0 0 10px 0', fontSize: '1.3rem'}}>Ready to Get Started?</h3>
            <p style={{margin: '0 0 15px 0'}}>
              Join our platform and experience the future of railway component management.
            </p>
            <button 
              style={styles.loginBtn}
              onClick={() => {
                onClose();
                onLogin();
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 25px rgba(0, 123, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              🚀 Login / Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
