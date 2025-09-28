import React from 'react';

const ComponentDetailsPage = ({ componentData, onClose }) => {
  if (!componentData) {
    return (
      <div style={styles.container}>
        <div style={styles.errorCard}>
          <h2 style={styles.errorTitle}>❌ No Component Data</h2>
          <p style={styles.errorText}>QR code data is not available or invalid.</p>
          <button style={{...styles.button, ...styles.primaryBtn}} onClick={onClose}>
            🔙 Go Back
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getWarrantyStatus = (warrantyEnd) => {
    try {
      const endDate = new Date(warrantyEnd);
      const today = new Date();
      const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
      
      if (daysLeft > 90) {
        return { status: 'Active', color: '#28a745', icon: '✅', message: `${daysLeft} days remaining` };
      } else if (daysLeft > 0) {
        return { status: 'Expiring Soon', color: '#ffc107', icon: '⚠️', message: `${daysLeft} days remaining` };
      } else {
        return { status: 'Expired', color: '#dc3545', icon: '❌', message: `Expired ${Math.abs(daysLeft)} days ago` };
      }
    } catch {
      return { status: 'Unknown', color: '#6c757d', icon: '❓', message: 'Date format error' };
    }
  };

  const warranty = getWarrantyStatus(componentData.warrantyEnd);

  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      backdropFilter: 'blur(5px)'
    },
    card: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 249, 250, 0.98) 100%)',
      borderRadius: '20px',
      padding: '35px',
      maxWidth: '800px',
      width: '90%',
      maxHeight: '85vh',
      overflow: 'auto',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
      paddingBottom: '20px',
      borderBottom: '2px solid #e9ecef'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#6c757d',
      margin: '0'
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '25px',
      marginBottom: '30px'
    },
    detailSection: {
      background: 'rgba(255, 255, 255, 0.7)',
      padding: '25px',
      borderRadius: '15px',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(0, 0, 0, 0.05)'
    },
    sectionTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#495057',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid #f1f3f4',
      flexWrap: 'wrap'
    },
    detailLabel: {
      fontWeight: '600',
      color: '#495057',
      fontSize: '14px',
      minWidth: '120px'
    },
    detailValue: {
      color: '#2c3e50',
      fontSize: '14px',
      fontWeight: '500',
      textAlign: 'right',
      flex: 1
    },
    warrantyStatus: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '13px',
      fontWeight: '600'
    },
    statusCard: {
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      padding: '20px',
      borderRadius: '15px',
      textAlign: 'center',
      marginBottom: '25px',
      border: '1px solid #90caf9'
    },
    qrInfo: {
      fontSize: '13px',
      color: '#1565c0',
      marginTop: '10px'
    },
    button: {
      padding: '14px 28px',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      margin: '5px'
    },
    primaryBtn: {
      background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
      color: 'white'
    },
    errorCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '40px',
      borderRadius: '20px',
      textAlign: 'center',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
    },
    errorTitle: {
      color: '#dc3545',
      fontSize: '1.8rem',
      marginBottom: '15px'
    },
    errorText: {
      color: '#6c757d',
      fontSize: '16px',
      marginBottom: '25px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            🚂 Railway Component Details
          </h1>
          <p style={styles.subtitle}>Scanned QR Code Information</p>
        </div>

        <div style={styles.statusCard}>
          <div style={{
            ...styles.warrantyStatus,
            backgroundColor: warranty.color + '20',
            color: warranty.color,
            fontSize: '16px',
            margin: '0 auto',
            maxWidth: 'fit-content'
          }}>
            {warranty.icon} {warranty.status}
          </div>
          <div style={styles.qrInfo}>
            Warranty: {warranty.message}
          </div>
        </div>

        <div style={styles.detailsGrid}>
          <div style={styles.detailSection}>
            <h3 style={styles.sectionTitle}>
              🔧 Component Information
            </h3>
            
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Type:</span>
              <span style={styles.detailValue}>{componentData.type}</span>
            </div>
            
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Batch ID:</span>
              <span style={styles.detailValue}>{componentData.batchId}</span>
            </div>
            
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Quantity:</span>
              <span style={styles.detailValue}>{componentData.quantity}</span>
            </div>
            
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Component ID:</span>
              <span style={styles.detailValue}>#{componentData.componentId}</span>
            </div>
          </div>

          <div style={styles.detailSection}>
            <h3 style={styles.sectionTitle}>
              📅 Timeline Information
            </h3>
            
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Supply Date:</span>
              <span style={styles.detailValue}>{formatDate(componentData.supplyDate)}</span>
            </div>
            
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Warranty End:</span>
              <span style={styles.detailValue}>{formatDate(componentData.warrantyEnd)}</span>
            </div>
            
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>QR Generated:</span>
              <span style={styles.detailValue}>
                {componentData.scannedAt ? formatDate(componentData.scannedAt) : 'N/A'}
              </span>
            </div>
          </div>

          <div style={styles.detailSection}>
            <h3 style={styles.sectionTitle}>
              🏢 Supplier Information
            </h3>
            
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Supplier:</span>
              <span style={styles.detailValue}>{componentData.supplier}</span>
            </div>
            
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Cost:</span>
              <span style={styles.detailValue}>{componentData.cost}</span>
            </div>
          </div>

          <div style={styles.detailSection}>
            <h3 style={styles.sectionTitle}>
              📝 Technical Details
            </h3>
            
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Description:</span>
              <span style={styles.detailValue}>{componentData.description}</span>
            </div>
            
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Specifications:</span>
              <span style={styles.detailValue}>{componentData.specifications}</span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #e9ecef' }}>
          <button 
            style={{...styles.button, ...styles.primaryBtn}}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 123, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            ✅ Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComponentDetailsPage;