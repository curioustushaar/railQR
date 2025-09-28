import React, { useState } from 'react';
import './VerifyComponent.css';

const VerifyComponent = ({ userRole }) => {
  const [qrCode, setQrCode] = useState('');
  const [componentDetails, setComponentDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (!qrCode.trim()) {
      setError('Please enter a QR code');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Mock data for demonstration - replace with actual API call
      const mockData = {
        id: qrCode,
        batch: 'BTH-2024-001',
        vendor: 'Railway Components Ltd.',
        warranty: '5 Years',
        supplyDate: '2024-01-15',
        status: 'active',
        component: 'Track Sensor',
        location: 'Section A-12'
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setComponentDetails(mockData);
    } catch (err) {
      setError('Failed to verify component');
      setComponentDetails(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-component">
      <h2>Verify Component</h2>
      
      <div className="verify-input">
        <input
          type="text"
          placeholder="Enter QR Code or Component ID"
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value)}
          className="qr-input"
          onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
        />
        <button 
          onClick={handleVerify} 
          disabled={loading} 
          className="verify-btn"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <i className="error-icon">⚠️</i>
          {error}
        </div>
      )}

      {componentDetails && (
        <div className="component-details">
          <div className="details-header">
            <h3>Component Details</h3>
            <span className={`status-badge ${componentDetails.status}`}>
              {componentDetails.status.toUpperCase()}
            </span>
          </div>
          
          <div className="details-grid">
            <div className="detail-card">
              <div className="detail-label">Component ID</div>
              <div className="detail-value">{componentDetails.id}</div>
            </div>
            
            <div className="detail-card">
              <div className="detail-label">Component Type</div>
              <div className="detail-value">{componentDetails.component}</div>
            </div>
            
            <div className="detail-card">
              <div className="detail-label">Batch Number</div>
              <div className="detail-value">{componentDetails.batch}</div>
            </div>
            
            <div className="detail-card">
              <div className="detail-label">Vendor</div>
              <div className="detail-value">{componentDetails.vendor}</div>
            </div>
            
            <div className="detail-card">
              <div className="detail-label">Warranty Period</div>
              <div className="detail-value">{componentDetails.warranty}</div>
            </div>
            
            <div className="detail-card">
              <div className="detail-label">Supply Date</div>
              <div className="detail-value">
                {new Date(componentDetails.supplyDate).toLocaleDateString()}
              </div>
            </div>
            
            <div className="detail-card">
              <div className="detail-label">Location</div>
              <div className="detail-value">{componentDetails.location}</div>
            </div>
            
            <div className="detail-card">
              <div className="detail-label">User Role</div>
              <div className="detail-value">{userRole}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyComponent;