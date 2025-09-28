import React, { useState } from 'react';
import trainBg from "../assets/images/track.png";

const FeaturesPage = ({ onClose, onLogin }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      id: 1,
      icon: '🔥',
      title: 'Laser QR Marking Technology',
      subtitle: 'Advanced Permanent Marking',
      description: 'State-of-the-art laser marking technology specifically designed for Indian Railway components.',
      details: [
        'Fiber laser technology for permanent, high-contrast QR codes',
        'Weather-resistant marking that withstands extreme conditions',
        'Suitable for steel, aluminum, and composite railway components',
        'Automated marking systems for high-volume production',
        'Quality control and verification systems',
        'Compliance with Indian Railway specifications'
      ],
      benefits: [
        'Permanent identification that lasts the component lifetime',
        'No additional materials or consumables required',
        'High-speed marking process for efficient production',
        'Zero maintenance marking solution'
      ]
    },
    {
      id: 2,
      icon: '📱',
      title: 'Mobile QR Scanning',
      subtitle: 'Real-time Component Access',
      description: 'Advanced mobile scanning capabilities with offline functionality for remote railway locations.',
      details: [
        'High-speed QR code scanning with camera optimization',
        'Offline data access for remote locations without internet',
        'Multi-platform support (Android, iOS, Web)',
        'Bulk scanning capabilities for inventory management',
        'GPS location tracking for scan history',
        'Voice-guided scanning for hands-free operation'
      ],
      benefits: [
        'Instant access to component information anywhere',
        'Works in poor lighting and weather conditions',
        'Reduces manual data entry errors by 99%',
        'Supports multiple scanning modes and workflows'
      ]
    },
    {
      id: 3,
      icon: '📊',
      title: 'Analytics & Reporting',
      subtitle: 'Comprehensive Data Insights',
      description: 'Advanced analytics platform for component lifecycle management and predictive maintenance.',
      details: [
        'Real-time dashboard with customizable widgets',
        'Component lifecycle tracking and analysis',
        'Predictive maintenance scheduling and alerts',
        'Quality trend analysis and reporting',
        'Integration with existing railway management systems',
        'Export capabilities for regulatory compliance'
      ],
      benefits: [
        'Reduce maintenance costs by up to 30%',
        'Improve component reliability and safety',
        'Data-driven decision making for operations',
        'Automated compliance reporting'
      ]
    },
    {
      id: 4,
      icon: '🔐',
      title: 'Multi-Role Access Control',
      subtitle: 'Secure Role-Based System',
      description: 'Comprehensive access control system designed for railway organizational structure.',
      details: [
        'Role-based permissions (Admin, Inspector, Vendor, Operator)',
        'Single Sign-On (SSO) integration with railway systems',
        'Multi-factor authentication for enhanced security',
        'Audit trails for all system activities',
        'Customizable workflows for different departments',
        'Integration with Active Directory and LDAP systems'
      ],
      benefits: [
        'Enhanced security and data protection',
        'Streamlined user management',
        'Compliance with railway security standards',
        'Reduced administrative overhead'
      ]
    },
    {
      id: 5,
      icon: '☁️',
      title: 'Cloud Infrastructure',
      subtitle: 'Scalable & Reliable Platform',
      description: 'Enterprise-grade cloud infrastructure designed for railway-scale operations.',
      details: [
        'Multi-region deployment for high availability',
        'Auto-scaling infrastructure to handle peak loads',
        'Data backup and disaster recovery systems',
        'API-first architecture for easy integrations',
        'Real-time data synchronization across locations',
        'Compliance with data protection regulations'
      ],
      benefits: [
        '99.99% uptime guarantee',
        'Secure data storage and transmission',
        'Scalable to handle millions of components',
        'Cost-effective pay-as-you-scale model'
      ]
    },
    {
      id: 6,
      icon: '🔧',
      title: 'Maintenance Management',
      subtitle: 'Intelligent Maintenance Workflows',
      description: 'Advanced maintenance management system with predictive capabilities.',
      details: [
        'Automated maintenance scheduling based on usage patterns',
        'Predictive failure analysis using AI/ML algorithms',
        'Work order generation and tracking',
        'Spare parts inventory integration',
        'Maintenance history and documentation',
        'Performance metrics and KPI tracking'
      ],
      benefits: [
        'Reduce unplanned downtime by 40%',
        'Optimize maintenance resource allocation',
        'Extend component lifespan through data insights',
        'Improve overall railway operational efficiency'
      ]
    },
    {
      id: 7,
      icon: '✅',
      title: 'Quality Assurance',
      subtitle: 'Digital Quality Management',
      description: 'Comprehensive quality management system for railway components.',
      details: [
        'Digital inspection checklists and workflows',
        'Photo and video documentation of inspections',
        'Quality trend analysis and reporting',
        'Non-conformance tracking and resolution',
        'Supplier quality management',
        'Certification and compliance tracking'
      ],
      benefits: [
        'Improve quality consistency across operations',
        'Reduce quality-related failures by 35%',
        'Streamline certification processes',
        'Enhanced traceability for regulatory compliance'
      ]
    },
    {
      id: 8,
      icon: '🌐',
      title: 'System Integration',
      subtitle: 'Seamless Railway System Integration',
      description: 'Comprehensive integration capabilities with existing railway management systems.',
      details: [
        'ERP system integration (SAP, Oracle, custom systems)',
        'SCADA and monitoring system connectivity',
        'Asset management system integration',
        'Financial system integration for cost tracking',
        'Regulatory reporting system connections',
        'Third-party logistics system integration'
      ],
      benefits: [
        'Unified data across all railway systems',
        'Eliminate data silos and manual processes',
        'Improved operational visibility and control',
        'Reduced IT complexity and maintenance costs'
      ]
    }
  ];

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
      maxWidth: '1400px',
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
      padding: '40px'
    },
    intro: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    subtitle: {
      fontSize: '1.3rem',
      opacity: '0.9',
      marginBottom: '30px',
      lineHeight: '1.6'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '25px',
      marginBottom: '40px'
    },
    featureCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '15px',
      padding: '25px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      overflow: 'hidden'
    },
    featureIcon: {
      fontSize: '2.5rem',
      marginBottom: '15px',
      display: 'block'
    },
    featureTitle: {
      fontSize: '1.4rem',
      fontWeight: '700',
      marginBottom: '8px',
      color: '#87CEEB'
    },
    featureSubtitle: {
      fontSize: '1rem',
      opacity: '0.8',
      marginBottom: '15px',
      color: '#B0E0E6'
    },
    featureDescription: {
      fontSize: '1rem',
      lineHeight: '1.6',
      opacity: '0.9'
    },
    detailModal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1100,
      padding: '20px'
    },
    detailContent: {
      background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${trainBg})`,
      backgroundSize: 'cover',
      borderRadius: '15px',
      padding: '40px',
      maxWidth: '800px',
      width: '100%',
      maxHeight: '80vh',
      overflow: 'auto',
      color: 'white'
    },
    detailHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px'
    },
    detailTitle: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#87CEEB'
    },
    detailSection: {
      marginBottom: '30px'
    },
    detailSectionTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      marginBottom: '15px',
      color: '#B0E0E6'
    },
    detailList: {
      listStyle: 'none',
      padding: 0
    },
    detailListItem: {
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '12px 15px',
      marginBottom: '10px',
      borderRadius: '8px',
      borderLeft: '4px solid #007bff',
      fontSize: '1rem',
      lineHeight: '1.5'
    },
    callToAction: {
      background: 'rgba(0, 123, 255, 0.2)',
      padding: '30px',
      borderRadius: '15px',
      textAlign: 'center',
      marginTop: '40px',
      border: '1px solid rgba(0, 123, 255, 0.3)'
    },
    ctaTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '15px',
      color: '#87CEEB'
    },
    ctaButtons: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: '20px'
    },
    ctaButton: {
      background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
      color: 'white',
      padding: '12px 25px',
      border: 'none',
      borderRadius: '25px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block'
    },
    secondaryButton: {
      background: 'rgba(255, 255, 255, 0.15)',
      color: 'white',
      padding: '12px 25px',
      border: '2px solid rgba(255, 255, 255, 0.5)',
      borderRadius: '25px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block'
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.container} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h1 style={styles.title}>⚡ Features & Services</h1>
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
          <div style={styles.intro}>
            <p style={styles.subtitle}>
              Discover our comprehensive suite of advanced features designed specifically for 
              Indian Railway component management. Each feature is built with railway operations 
              in mind, ensuring maximum efficiency, safety, and reliability.
            </p>
          </div>

          <div style={styles.featuresGrid}>
            {features.map((feature) => (
              <div
                key={feature.id}
                style={styles.featureCard}
                onClick={() => setSelectedFeature(feature)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <span style={styles.featureIcon}>{feature.icon}</span>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureSubtitle}>{feature.subtitle}</p>
                <p style={styles.featureDescription}>{feature.description}</p>
                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  right: '15px',
                  background: 'rgba(0, 123, 255, 0.3)',
                  padding: '5px 10px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  Click for details →
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div style={styles.callToAction}>
            <h2 style={styles.ctaTitle}>🚀 Ready to Transform Your Railway Operations?</h2>
            <p style={{margin: '0 0 20px 0', fontSize: '1.1rem', opacity: '0.9'}}>
              Join leading railway organizations already using our advanced QR management system.
              Get started today with a free demo and see the difference our technology can make.
            </p>
            <div style={styles.ctaButtons}>
              <button 
                style={styles.ctaButton}
                onClick={() => {
                  onClose();
                  onLogin();
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(0, 123, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                🔐 Get Started Now
              </button>
              <button 
                style={styles.secondaryButton}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                📞 Request Demo
              </button>
            </div>
          </div>
        </div>

        {/* Feature Detail Modal */}
        {selectedFeature && (
          <div style={styles.detailModal} onClick={() => setSelectedFeature(null)}>
            <div style={styles.detailContent} onClick={(e) => e.stopPropagation()}>
              <div style={styles.detailHeader}>
                <div>
                  <span style={{fontSize: '2rem', marginRight: '15px'}}>{selectedFeature.icon}</span>
                  <span style={styles.detailTitle}>{selectedFeature.title}</span>
                </div>
                <button 
                  style={styles.closeBtn}
                  onClick={() => setSelectedFeature(null)}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                >
                  ✕
                </button>
              </div>

              <div style={styles.detailSection}>
                <p style={{fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px'}}>
                  {selectedFeature.description}
                </p>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.detailSectionTitle}>🔧 Key Features</h3>
                <ul style={styles.detailList}>
                  {selectedFeature.details.map((detail, index) => (
                    <li key={index} style={styles.detailListItem}>
                      ✓ {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.detailSectionTitle}>💡 Benefits</h3>
                <ul style={styles.detailList}>
                  {selectedFeature.benefits.map((benefit, index) => (
                    <li key={index} style={{...styles.detailListItem, borderLeftColor: '#28a745'}}>
                      🎯 {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Responsive CSS */}
        <style jsx>{`
          @media (max-width: 768px) {
            .featuresGrid {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }
            .content {
              padding: 30px 20px !important;
            }
            .header {
              padding: 30px 20px 15px 20px !important;
            }
            .title {
              font-size: 2rem !important;
            }
            .ctaButtons {
              flex-direction: column !important;
              align-items: center !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default FeaturesPage;
