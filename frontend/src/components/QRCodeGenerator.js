import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = ({ data, size = 200, style = {} }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && data) {
      // Generate simple QR code that phones can easily scan
      let qrText;
      
      if (typeof data === 'object') {
        // Create simple readable text instead of complex JSON
        qrText = `Railway Component
Type: ${data.type}
Batch: ${data.batchId}
Qty: ${data.quantity}
Supplier: ${data.supplier}
Cost: ${data.cost}`;
      } else {
        qrText = data;
      }
      
      QRCode.toCanvas(canvasRef.current, qrText, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M',
        type: 'image/png',
        quality: 0.92
      }, (error) => {
        if (error) {
          console.error('QR Code generation error:', error);
        }
      });
    }
  }, [data, size]);

  if (!data) {
    return (
      <div style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        color: '#666',
        fontSize: '14px'
      }}>
        No data available
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', ...style }}>
      <canvas 
        ref={canvasRef}
        style={{
          borderRadius: '4px',
          background: 'white',
          display: 'block'
        }}
      />
      <p style={{
        marginTop: '12px',
        fontSize: '11px',
        color: '#666',
        fontWeight: '500',
        opacity: 0.8
      }}>
        Scan for Component Details
      </p>
    </div>
  );
};

export default QRCodeGenerator;