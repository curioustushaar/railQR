import React, { useState, useRef, useEffect } from 'react';

const QRScanner = ({ onScanResult, onClose, isActive }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [manualInput, setManualInput] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // QR Code detection using simple pattern matching
  const detectQRCode = (imageData) => {
    // This is a simplified QR detection - in production, use a proper QR library
    // For now, we'll simulate QR detection
    return null;
  };

  const startCamera = async () => {
    try {
      setError('');
      setIsScanning(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera if available
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions or use manual input.');
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const handleManualInput = () => {
    if (manualInput.trim()) {
      try {
        const qrData = JSON.parse(manualInput);
        onScanResult(qrData);
      } catch (err) {
        setError('Invalid QR code data format. Please check the input.');
      }
    }
  };

  useEffect(() => {
    if (isActive && !isScanning) {
      startCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [isActive]);

  const styles = {
    scannerContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    videoContainer: {
      position: 'relative',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
      marginBottom: '20px'
    },
    video: {
      width: '100%',
      maxWidth: '400px',
      height: 'auto',
      display: 'block'
    },
    overlay: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '200px',
      height: '200px',
      border: '3px solid #00ff00',
      borderRadius: '15px',
      pointerEvents: 'none'
    },
    controlsContainer: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      padding: '25px',
      maxWidth: '400px',
      width: '100%',
      textAlign: 'center',
      backdropFilter: 'blur(10px)'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px'
    },
    instruction: {
      color: '#6c757d',
      marginBottom: '20px',
      fontSize: '14px',
      lineHeight: '1.5'
    },
    manualInputSection: {
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      border: '1px solid #dee2e6'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '2px solid #e9ecef',
      borderRadius: '8px',
      fontSize: '14px',
      marginBottom: '15px',
      resize: 'vertical'
    },
    button: {
      padding: '12px 24px',
      margin: '5px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    primaryBtn: {
      backgroundColor: '#007bff',
      color: 'white'
    },
    secondaryBtn: {
      backgroundColor: '#6c757d',
      color: 'white'
    },
    errorMsg: {
      color: '#dc3545',
      fontSize: '13px',
      marginTop: '10px',
      padding: '10px',
      backgroundColor: '#f8d7da',
      borderRadius: '5px',
      border: '1px solid #f5c6cb'
    }
  };

  return (
    <div style={styles.scannerContainer}>
      <div style={styles.controlsContainer}>
        <h3 style={styles.title}>
          📱 QR Code Scanner
        </h3>
        
        {isScanning ? (
          <div>
            <div style={styles.videoContainer}>
              <video
                ref={videoRef}
                style={styles.video}
                autoPlay
                playsInline
                muted
              />
              <div style={styles.overlay}></div>
            </div>
            <p style={styles.instruction}>
              📸 Point your camera at the QR code to scan
            </p>
            <button 
              style={{...styles.button, ...styles.secondaryBtn}}
              onClick={stopCamera}
            >
              ⏹️ Stop Camera
            </button>
          </div>
        ) : (
          <div>
            <p style={styles.instruction}>
              🔍 Start camera to scan QR codes or enter data manually
            </p>
            <button 
              style={{...styles.button, ...styles.primaryBtn}}
              onClick={startCamera}
            >
              📷 Start Camera
            </button>
          </div>
        )}

        <div style={styles.manualInputSection}>
          <h4 style={{ color: '#495057', marginBottom: '10px', fontSize: '1.1rem' }}>
            ⌨️ Manual Input
          </h4>
          <p style={{ fontSize: '12px', color: '#6c757d', marginBottom: '15px' }}>
            Enter QR code data manually if camera scanning doesn't work
          </p>
          <textarea
            style={styles.input}
            placeholder='Paste QR code data here (JSON format)...'
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            rows="4"
          />
          <button 
            style={{...styles.button, ...styles.primaryBtn}}
            onClick={handleManualInput}
            disabled={!manualInput.trim()}
          >
            ✅ Process Manual Input
          </button>
        </div>

        {error && (
          <div style={styles.errorMsg}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ marginTop: '20px' }}>
          <button 
            style={{...styles.button, ...styles.secondaryBtn}}
            onClick={onClose}
          >
            ❌ Close Scanner
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;