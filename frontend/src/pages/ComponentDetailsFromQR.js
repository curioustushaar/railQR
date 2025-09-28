import React, { useState, useEffect } from 'react';

const ComponentDetailsFromQR = () => {
  const [componentData, setComponentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get component data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
    
    if (encodedData) {
      try {
        const decodedData = atob(encodedData);
        const componentInfo = JSON.parse(decodedData);
        setComponentData(componentInfo);
      } catch (err) {
        setError('Invalid QR code data');
      }
    } else {
      setError('No component data found');
    }
    
    setLoading(false);
  }, []);

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

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '30px',
      maxWidth: '600px',
      margin: '0 auto',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)'
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
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 0',
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
      padding: '10px 20px',
      borderRadius: '25px',
      fontSize: '14px',
      fontWeight: '600',
      margin: '20px auto',
      maxWidth: 'fit-content'
    },
    statusCard: {
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      padding: '20px',
      borderRadius: '15px',
      textAlign: 'center',
      marginBottom: '25px',
      border: '1px solid #90caf9'
    },
    errorCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '40px',
      borderRadius: '20px',
      textAlign: 'center',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
    },
    loadingCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '40px',
      borderRadius: '20px',
      textAlign: 'center',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
    },
    qrScanInfo: {
      background: 'linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)',
      color: 'white',
      padding: '15px',
      borderRadius: '10px',
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '13px'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingCard}>
          <h2>🔍 Loading Component Details...</h2>
          <p>Please wait while we process the QR code data.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorCard}>
          <h2 style={{ color: '#dc3545' }}>❌ Error</h2>
          <p style={{ color: '#6c757d', fontSize: '16px' }}>{error}</p>
          <button 
            onClick={() => window.history.back()}
            style={{
              background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            🔙 Go Back
          </button>
        </div>
      </div>
    );
  }

  const warranty = getWarrantyStatus(componentData.warrantyEnd);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            🚂 Railway Component Details
          </h1>
          <p style={styles.subtitle}>Scanned from QR Code</p>
        </div>

        <div style={styles.statusCard}>
          <div style={{
            ...styles.warrantyStatus,
            backgroundColor: warranty.color + '20',
            color: warranty.color,
            fontSize: '16px'
          }}>
            {warranty.icon} {warranty.status}
          </div>
          <div style={{ fontSize: '13px', color: '#1565c0', marginTop: '10px' }}>
            Warranty: {warranty.message}
          </div>
        </div>

        <div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>🔧 Component Type:</span>
            <span style={styles.detailValue}>{componentData.type}</span>
          </div>
          
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>🏷️ Batch ID:</span>
            <span style={styles.detailValue}>{componentData.batchId}</span>
          </div>
          
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>📦 Quantity:</span>
            <span style={styles.detailValue}>{componentData.quantity}</span>
          </div>
          
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>📅 Supply Date:</span>
            <span style={styles.detailValue}>{formatDate(componentData.supplyDate)}</span>
          </div>
          
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>⏰ Warranty End:</span>
            <span style={styles.detailValue}>{formatDate(componentData.warrantyEnd)}</span>
          </div>
          
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>🏢 Supplier:</span>
            <span style={styles.detailValue}>{componentData.supplier}</span>
          </div>
          
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>💰 Cost:</span>
            <span style={styles.detailValue}>{componentData.cost}</span>
          </div>
          
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>📊 Status:</span>
            <span style={styles.detailValue}>
              <span style={{
                padding: '4px 12px',
                borderRadius: '15px',
                backgroundColor: componentData.status === 'Active' ? '#d4edda' : '#f8d7da',
                color: componentData.status === 'Active' ? '#155724' : '#721c24',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {componentData.status === 'Active' ? '✅ Active' : '❌ Inactive'}
              </span>
            </span>
          </div>
          
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>📝 Description:</span>
            <span style={styles.detailValue}>{componentData.description}</span>
          </div>
          
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>⚙️ Specifications:</span>
            <span style={styles.detailValue}>{componentData.specifications}</span>
          </div>
        </div>

        <div style={styles.qrScanInfo}>
          📱 <strong>QR Code Scanned Successfully!</strong><br/>
          This component information was retrieved from the Railway QR Management System.
        </div>
      </div>
    </div>
  );
};

export default ComponentDetailsFromQR;