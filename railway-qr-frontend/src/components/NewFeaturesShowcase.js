import React from 'react';

const NewFeaturesShowcase = ({ onClose }) => {
  const features = [
    {
      icon: '📄',
      title: 'About Page',
      description: 'Comprehensive information about Railway QR System with mission, features, team, and statistics',
      highlights: ['System overview', 'Technology stack', 'Team information', 'Impact statistics']
    },
    {
      icon: '📞',
      title: 'Contact Page',
      description: 'Complete contact solution with form, office information, and emergency support',
      highlights: ['Working contact form', 'Office locations', '24/7 emergency support', 'Social media links']
    },
    {
      icon: '⚡',
      title: 'Features Page',
      description: 'Detailed features showcase with interactive cards and comprehensive information',
      highlights: ['8 core features', 'Detailed descriptions', 'Benefits analysis', 'Interactive modals']
    },
    {
      icon: '🎨',
      title: 'Enhanced UI/UX',
      description: 'Modern design with animations, glassmorphism effects, and responsive layout',
      highlights: ['Smooth animations', 'Glass effects', 'Mobile responsive', 'Loading states']
    }
  ];

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    container: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '20px',
      width: '100%',
      maxWidth: '900px',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)'
    },
    header: {
      padding: '40px 40px 20px 40px',
      background: 'rgba(0, 0, 0, 0.2)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
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
      padding: '40px'
    },
    subtitle: {
      fontSize: '1.2rem',
      opacity: '0.9',
      marginBottom: '30px',
      textAlign: 'center',
      lineHeight: '1.6'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '25px',
      marginBottom: '40px'
    },
    featureCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '15px',
      padding: '25px',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)'
    },
    featureIcon: {
      fontSize: '2.5rem',
      marginBottom: '15px',
      display: 'block'
    },
    featureTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      marginBottom: '10px',
      color: '#87CEEB'
    },
    featureDescription: {
      fontSize: '1rem',
      lineHeight: '1.6',
      marginBottom: '15px',
      opacity: '0.9'
    },
    highlights: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    highlightItem: {
      background: 'rgba(0, 123, 255, 0.2)',
      padding: '8px 12px',
      marginBottom: '8px',
      borderRadius: '8px',
      fontSize: '0.9rem',
      borderLeft: '3px solid #007bff'
    },
    footer: {
      background: 'rgba(0, 0, 0, 0.2)',
      padding: '30px 40px',
      textAlign: 'center',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)'
    },
    footerText: {
      fontSize: '1.1rem',
      marginBottom: '20px',
      opacity: '0.9'
    },
    actionBtn: {
      background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
      color: 'white',
      padding: '15px 30px',
      border: 'none',
      borderRadius: '25px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginRight: '15px'
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.container} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h1 style={styles.title}>🎉 New Features Added!</h1>
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
          <p style={styles.subtitle}>
            Your Railway QR Management System has been enhanced with powerful new features 
            and improved user experience. Here's what's new:
          </p>

          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={styles.featureCard}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <span style={styles.featureIcon}>{feature.icon}</span>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
                <ul style={styles.highlights}>
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} style={styles.highlightItem}>
                      ✓ {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            All features are now live and ready to use. Navigate through the menu to explore!
          </p>
          <button
            style={styles.actionBtn}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 25px rgba(0, 123, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            🚀 Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewFeaturesShowcase;