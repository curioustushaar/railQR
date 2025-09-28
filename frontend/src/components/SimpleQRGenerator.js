import React from 'react';
import QRCode from 'react-qr-code';

const SimpleQRGenerator = ({ component, size = 200 }) => {
  if (!component) {
    return (
      <div style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed #ddd',
        borderRadius: '8px',
        color: '#666',
        fontSize: '14px'
      }}>
        No component data
      </div>
    );
  }

  // Create simple, scannable text
  const qrText = `Railway Component
Type: ${component.type}
Batch ID: ${component.batchId}
Quantity: ${component.quantity}
Supply Date: ${component.supplyDate}
Warranty: ${component.warrantyEnd}
Supplier: ${component.supplier}
Cost: ${component.cost}`;

  return (
    <div style={{ 
      textAlign: 'center',
      padding: '20px',
      background: 'white',
      borderRadius: '15px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <QRCode
        value={qrText}
        size={size}
        style={{ 
          height: "auto", 
          maxWidth: "100%", 
          width: "100%",
          border: '4px solid white',
          borderRadius: '8px'
        }}
        viewBox={`0 0 256 256`}
      />
      <p style={{
        marginTop: '15px',
        fontSize: '12px',
        color: '#666',
        fontWeight: '500'
      }}>
        📱 Scan with your phone camera
      </p>
      <div style={{
        marginTop: '10px',
        fontSize: '10px',
        color: '#999',
        lineHeight: '1.4'
      }}>
        <strong>Component:</strong> {component.batchId}<br/>
        <strong>Type:</strong> {component.type}
      </div>
    </div>
  );
};

export default SimpleQRGenerator;