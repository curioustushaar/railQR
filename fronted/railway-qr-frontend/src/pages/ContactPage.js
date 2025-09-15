import React, { useState } from 'react';
import trainBg from "../assets/images/track.png";

const ContactPage = ({ onClose, onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        subject: '',
        message: '',
        type: 'general'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
      maxWidth: '1200px',
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
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '40px'
    },
    contactInfo: {
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '30px',
      borderRadius: '15px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)'
    },
    sectionTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '25px',
      color: '#87CEEB',
      borderLeft: '4px solid #007bff',
      paddingLeft: '15px'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      padding: '15px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '10px',
      transition: 'all 0.3s ease'
    },
    contactIcon: {
      fontSize: '1.5rem',
      marginRight: '15px',
      width: '40px',
      textAlign: 'center'
    },
    contactText: {
      fontSize: '1.1rem',
      lineHeight: '1.6'
    },
    contactLabel: {
      fontSize: '0.9rem',
      opacity: '0.8',
      display: 'block'
    },
    form: {
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '30px',
      borderRadius: '15px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      color: '#87CEEB'
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(5px)'
    },
    select: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(5px)'
    },
    textarea: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      fontSize: '1rem',
      minHeight: '120px',
      resize: 'vertical',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(5px)',
      fontFamily: 'inherit'
    },
    submitBtn: {
      background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
      color: 'white',
      padding: '15px 30px',
      border: 'none',
      borderRadius: '25px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
      marginTop: '10px'
    },
    officeHours: {
      background: 'rgba(0, 123, 255, 0.2)',
      padding: '20px',
      borderRadius: '15px',
      marginTop: '25px',
      border: '1px solid rgba(0, 123, 255, 0.3)'
    },
    hoursTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '15px',
      color: '#87CEEB'
    },
    hoursText: {
      fontSize: '1rem',
      lineHeight: '1.6',
      opacity: '0.9'
    },
    emergencyContact: {
      background: 'rgba(255, 0, 0, 0.2)',
      padding: '20px',
      borderRadius: '15px',
      marginTop: '20px',
      border: '1px solid rgba(255, 0, 0, 0.3)'
    },
    emergencyTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '10px',
      color: '#ffcccb'
    },
    successMessage: {
      background: 'rgba(0, 255, 0, 0.2)',
      padding: '15px',
      borderRadius: '10px',
      border: '1px solid rgba(0, 255, 0, 0.3)',
      marginBottom: '20px',
      textAlign: 'center',
      color: '#90EE90'
    },
    errorMessage: {
      background: 'rgba(255, 0, 0, 0.2)',
      padding: '15px',
      borderRadius: '10px',
      border: '1px solid rgba(255, 0, 0, 0.3)',
      marginBottom: '20px',
      textAlign: 'center',
      color: '#ffcccb'
    },
    socialLinks: {
      display: 'flex',
      gap: '15px',
      marginTop: '20px',
      justifyContent: 'center'
    },
    socialLink: {
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '10px',
      borderRadius: '50%',
      color: 'white',
      textDecoration: 'none',
      fontSize: '1.2rem',
      transition: 'all 0.3s ease',
      width: '45px',
      height: '45px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.container} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h1 style={styles.title}>📞 Contact Us</h1>
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
          {/* Contact Information */}
          <div>
            <div style={styles.contactInfo}>
              <h2 style={styles.sectionTitle}>📍 Get in Touch</h2>
              
              <div 
                style={styles.contactItem}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
              >
                <span style={styles.contactIcon}>🏢</span>
                <div style={styles.contactText}>
                  <span style={styles.contactLabel}>Head Office</span>
                  Railway QR Systems Pvt. Ltd.<br />
                  Sector 12, Dwarka, New Delhi - 110078<br />
                  Near Delhi Metro Station
                </div>
              </div>

              <div 
                style={styles.contactItem}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
              >
                <span style={styles.contactIcon}>📞</span>
                <div style={styles.contactText}>
                  <span style={styles.contactLabel}>Phone</span>
                  +91-6202888431<br />
                  +91-7277351030 (Support)
                </div>
              </div>

              <div 
                style={styles.contactItem}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
              >
                <span style={styles.contactIcon}>✉️</span>
                <div style={styles.contactText}>
                  <span style={styles.contactLabel}>Email</span>
                  info@railwayqr.in<br />
                  support@railwayqr.in
                </div>
              </div>

              <div 
                style={styles.contactItem}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
              >
                <span style={styles.contactIcon}>🌐</span>
                <div style={styles.contactText}>
                  <span style={styles.contactLabel}>Website</span>
                  www.railwayqr.in<br />
                  portal.railwayqr.in
                </div>
              </div>

              {/* Office Hours */}
              <div style={styles.officeHours}>
                <h3 style={styles.hoursTitle}>⏰ Office Hours</h3>
                <div style={styles.hoursText}>
                  <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM<br />
                  <strong>Saturday:</strong> 9:00 AM - 2:00 PM<br />
                  <strong>Sunday:</strong> Closed<br />
                  <br />
                  <em>*Technical Support available 24/7 for critical issues</em>
                </div>
              </div>

              {/* Emergency Contact */}
              <div style={styles.emergencyContact}>
                <h3 style={styles.emergencyTitle}>🚨 Emergency Support</h3>
                <div style={styles.hoursText}>
                  <strong>24/7 Helpline:</strong> 1800-RAIL-QR<br />
                  <strong>WhatsApp:</strong> +91-98765-43210<br />
                  <em>For critical system failures and urgent assistance</em>
                </div>
              </div>

              {/* Social Links */}
              <div style={styles.socialLinks}>
                <a href="#" style={styles.socialLink} 
                   onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                   onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}>
                  📘
                </a>
                <a href="#" style={styles.socialLink}
                   onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                   onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}>
                  🐦
                </a>
                <a href="#" style={styles.socialLink}
                   onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                   onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}>
                  💼
                </a>
                <a href="#" style={styles.socialLink}
                   onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                   onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}>
                  📺
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div style={styles.form}>
              <h2 style={styles.sectionTitle}>📝 Send Message</h2>
              
              {submitStatus === 'success' && (
                <div style={styles.successMessage}>
                  ✅ Thank you! Your message has been sent successfully. We'll respond within 24 hours.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div style={styles.errorMessage}>
                  ❌ Sorry, there was an error sending your message. Please try again or contact us directly.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                    placeholder="Enter your full name"
                    onFocus={(e) => e.target.style.borderColor = '#007bff'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                    placeholder="your.email@example.com"
                    onFocus={(e) => e.target.style.borderColor = '#007bff'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="+91-98765-43210"
                    onFocus={(e) => e.target.style.borderColor = '#007bff'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Organization/Railway Division</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="e.g., Northern Railway, Delhi Division"
                    onFocus={(e) => e.target.style.borderColor = '#007bff'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Inquiry Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    style={styles.select}
                    onFocus={(e) => e.target.style.borderColor = '#007bff'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="sales">Sales & Pricing</option>
                    <option value="demo">Request Demo</option>
                    <option value="partnership">Partnership</option>
                    <option value="training">Training & Support</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                    placeholder="Brief subject of your inquiry"
                    onFocus={(e) => e.target.style.borderColor = '#007bff'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    style={styles.textarea}
                    placeholder="Please provide details about your inquiry, requirements, or questions..."
                    onFocus={(e) => e.target.style.borderColor = '#007bff'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    ...styles.submitBtn,
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                  disabled={isSubmitting}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 25px rgba(0, 123, 255, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  {isSubmitting ? '🔄 Sending...' : '📧 Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Responsive CSS */}
        <style jsx>{`
          @media (max-width: 768px) {
            .content {
              grid-template-columns: 1fr !important;
              gap: 30px !important;
              padding: 30px 20px !important;
            }
            .header {
              padding: 30px 20px 15px 20px !important;
            }
            .title {
              font-size: 2rem !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ContactPage;
