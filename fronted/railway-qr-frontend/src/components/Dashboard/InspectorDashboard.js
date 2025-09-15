import React, { useState, useRef } from 'react';

const InspectorDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedComponent, setScannedComponent] = useState(null);
  const [inspections, setInspections] = useState([
    {
      id: 1,
      date: '2024-09-10',
      componentId: 'BP2024001',
      type: 'Brake Pad',
      status: 'OK',
      remarks: 'Component in good condition',
      inspector: 'Inspector User'
    }
  ]);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    header: {
      background: 'rgba(52, 73, 94, 0.95)',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: '700'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    logoutBtn: {
      background: '#e74c3c',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: '600'
    },
    navbar: {
      background: 'rgba(52, 73, 94, 0.8)',
      padding: '0 30px',
      display: 'flex',
      gap: '30px'
    },
    navItem: {
      padding: '15px 20px',
      color: 'white',
      cursor: 'pointer',
      borderBottom: '3px solid transparent',
      fontWeight: '600'
    },
    activeNavItem: {
      borderBottom: '3px solid #3498db'
    },
    content: {
      padding: '20px'
    },
    dashboardHeader: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '10px',
      padding: '30px',
      marginBottom: '25px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#2c3e50',
      margin: 0
    },
    subtitle: {
      color: '#7f8c8d',
      marginTop: '5px'
    },
    scannerCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '10px',
      padding: '40px',
      textAlign: 'center',
      marginBottom: '30px'
    },
    scannerTitle: {
      fontSize: '1.5rem',
      marginBottom: '20px',
      color: '#2c3e50'
    },
    videoContainer: {
      width: '400px',
      height: '300px',
      background: '#000',
      margin: '0 auto 20px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    scanButton: {
      background: '#27ae60',
      color: 'white',
      border: 'none',
      padding: '15px 30px',
      borderRadius: '10px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      margin: '0 10px'
    },
    stopButton: {
      background: '#e74c3c',
      color: 'white',
      border: 'none',
      padding: '15px 30px',
      borderRadius: '10px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      margin: '0 10px'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '10px',
      padding: '25px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      marginBottom: '25px'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '20px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      background: '#ecf0f1',
      padding: '15px',
      textAlign: 'left',
      fontWeight: '600',
      color: '#2c3e50',
      borderBottom: '2px solid #bdc3c7'
    },
    td: {
      padding: '15px',
      borderBottom: '1px solid #ecf0f1'
    },
    badge: {
      padding: '5px 10px',
      borderRadius: '15px',
      fontSize: '0.8rem',
      fontWeight: '600'
    },
    okBadge: {
      background: '#d4edda',
      color: '#155724'
    },
    defectBadge: {
      background: '#f8d7da',
      color: '#721c24'
    },
    componentDetails: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '10px',
      padding: '25px',
      marginTop: '20px'
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px'
    },
    inspectionForm: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '10px',
      padding: '25px',
      marginTop: '20px'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: '600',
      color: '#2c3e50'
    },
    select: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '1rem'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '1rem',
      minHeight: '80px',
      resize: 'vertical'
    },
    button: {
      background: '#3498db',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: '600'
    }
  };

  // Mock component data that would be fetched from QR scan
  const mockComponentData = {
    id: 'BP2024001',
    type: 'Brake Pad',
    batchId: 'BP2024001',
    quantity: 50,
    supplyDate: '2024-01-15',
    warrantyEnd: '2026-01-15',
    supplier: 'Railway Parts Co.',
    cost: '₹5,000',
    description: 'High-performance brake pads for trains',
    specifications: 'Material: Ceramic composite, Thickness: 15mm'
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsScanning(true);
      
      // Simulate QR code detection after 3 seconds
      setTimeout(() => {
        setScannedComponent(mockComponentData);
        stopCamera();
      }, 3000);
    } catch (err) {
      console.error('Error accessing camera:', err);
      // Fallback: simulate successful scan without camera
      setTimeout(() => {
        setScannedComponent(mockComponentData);
        setIsScanning(false);
      }, 1000);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  const submitInspection = (status, remarks) => {
    const newInspection = {
      id: inspections.length + 1,
      date: new Date().toISOString().split('T')[0],
      componentId: scannedComponent.id,
      type: scannedComponent.type,
      status: status,
      remarks: remarks,
      inspector: user.name
    };
    
    setInspections([newInspection, ...inspections]);
    setScannedComponent(null);
    setActiveTab('dashboard');
  };

  const renderDashboard = () => (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Recent Inspections</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Component ID</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Remarks</th>
            <th style={styles.th}>Inspector</th>
          </tr>
        </thead>
        <tbody>
          {inspections.map(inspection => (
            <tr key={inspection.id}>
              <td style={styles.td}>{inspection.date}</td>
              <td style={styles.td}>{inspection.componentId}</td>
              <td style={styles.td}>{inspection.type}</td>
              <td style={styles.td}>
                <span style={{
                  ...styles.badge,
                  ...(inspection.status === 'OK' ? styles.okBadge : styles.defectBadge)
                }}>
                  {inspection.status}
                </span>
              </td>
              <td style={styles.td}>{inspection.remarks}</td>
              <td style={styles.td}>{inspection.inspector}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderScanner = () => (
    <>
      <div style={styles.scannerCard}>
        <h2 style={styles.scannerTitle}>Scan Component QR Code</h2>
        <div style={styles.videoContainer}>
          {isScanning ? (
            <video ref={videoRef} style={styles.video} />
          ) : (
            <div>
              <p>📱 Camera Ready</p>
              <p style={{ fontSize: '0.8rem' }}>Click 'Start Scanning' to begin</p>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
        <div>
          {!isScanning ? (
            <button 
              style={styles.scanButton}
              onClick={startCamera}
            >
              Start Scanning
            </button>
          ) : (
            <button 
              style={styles.stopButton}
              onClick={stopCamera}
            >
              Stop Camera
            </button>
          )}
        </div>
        <p style={{ marginTop: '20px', color: '#666', fontSize: '0.9rem' }}>
          📄 Point camera at QR code to scan
        </p>
      </div>

      {scannedComponent && (
        <ComponentInspectionForm 
          component={scannedComponent} 
          onSubmit={submitInspection}
          styles={styles}
        />
      )}
    </>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logo}>🚂 Railway QR System</div>
        <div style={styles.userInfo}>
          <span>Welcome, {user.name} ({user.role})</span>
          <button style={styles.logoutBtn} onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.navbar}>
        <div 
          style={{
            ...styles.navItem,
            ...(activeTab === 'dashboard' ? styles.activeNavItem : {})
          }}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </div>
        <div 
          style={{
            ...styles.navItem,
            ...(activeTab === 'scanner' ? styles.activeNavItem : {})
          }}
          onClick={() => setActiveTab('scanner')}
        >
          Verify Component
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.dashboardHeader}>
          <div>
            <h1 style={styles.title}>🔍 Inspector Dashboard</h1>
            <p style={styles.subtitle}>Welcome, {user.name}</p>
          </div>
          <button style={styles.logoutBtn} onClick={onLogout}>
            Logout
          </button>
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'scanner' && renderScanner()}
      </div>
    </div>
  );
};

// Component Inspection Form Component
const ComponentInspectionForm = ({ component, onSubmit, styles }) => {
  const [inspectionStatus, setInspectionStatus] = useState('OK');
  const [remarks, setRemarks] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inspectionStatus, remarks);
  };

  return (
    <>
      <div style={styles.componentDetails}>
        <h3 style={styles.cardTitle}>Scanned Component Details</h3>
        <div style={styles.detailsGrid}>
          <div>
            <p><strong>Component ID:</strong> {component.id}</p>
            <p><strong>Type:</strong> {component.type}</p>
            <p><strong>Batch ID:</strong> {component.batchId}</p>
            <p><strong>Quantity:</strong> {component.quantity}</p>
          </div>
          <div>
            <p><strong>Supply Date:</strong> {component.supplyDate}</p>
            <p><strong>Warranty End:</strong> {component.warrantyEnd}</p>
            <p><strong>Supplier:</strong> {component.supplier}</p>
            <p><strong>Cost:</strong> {component.cost}</p>
          </div>
        </div>
        <p><strong>Description:</strong> {component.description}</p>
        <p><strong>Specifications:</strong> {component.specifications}</p>
      </div>

      <div style={styles.inspectionForm}>
        <h3 style={styles.cardTitle}>Inspection Report</h3>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Inspection Status</label>
            <select 
              style={styles.select}
              value={inspectionStatus}
              onChange={(e) => setInspectionStatus(e.target.value)}
            >
              <option value="OK">OK - Component in good condition</option>
              <option value="Minor Defect">Minor Defect - Small issues detected</option>
              <option value="Major Defect">Major Defect - Significant problems</option>
              <option value="Failed">Failed - Component requires replacement</option>
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Inspection Remarks</label>
            <textarea
              style={styles.textarea}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter detailed inspection remarks..."
              required
            />
          </div>
          
          <button type="submit" style={styles.button}>
            Submit Inspection Report
          </button>
        </form>
      </div>
    </>
  );
};

export default InspectorDashboard;