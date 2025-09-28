import React, { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const InspectorDashboard = ({ user, onLogout }) => {
  const [scanResult, setScanResult] = useState("");
  const [inspectionStatus, setInspectionStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [inspectionHistory, setInspectionHistory] = useState([]);
  const [currentComponent, setCurrentComponent] = useState(null);
  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  // Mock inspection history
  useEffect(() => {
    const mockHistory = [
      {
        id: 1,
        componentId: "BP2024001",
        type: "Brake Pad",
        date: "2024-09-10",
        status: "OK",
        remarks: "Component in good condition",
        inspector: user?.name || "Current Inspector"
      },
      {
        id: 2,
        componentId: "WA2024002",
        type: "Wheel Assembly",
        date: "2024-09-11",
        status: "Minor Defect",
        remarks: "Small surface wear visible",
        inspector: user?.name || "Current Inspector"
      }
    ];
    setInspectionHistory(mockHistory);
  }, [user]);

  // Start QR scanning
  const startScan = async () => {
    try {
      setIsScanning(true);
      // Get available video devices
      const videoInputDevices = await navigator.mediaDevices.enumerateDevices()
        .then(devices => devices.filter(device => device.kind === 'videoinput'));
      
      if (videoInputDevices.length === 0) {
        alert("No camera found!");
        setIsScanning(false);
        return;
      }

      // Start video stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Use back camera if available
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        
        // Start decoding
        const result = await codeReader.current.decodeOnceFromVideoDevice(undefined, videoRef.current);
        setScanResult(result.text);
        
        // Parse component data
        try {
          const componentData = JSON.parse(result.text);
          setCurrentComponent(componentData);
        } catch (e) {
          setCurrentComponent(null);
        }
        
        setIsScanning(false);
        // Stop video stream
        stream.getTracks().forEach(track => track.stop());
      }
    } catch (err) {
      console.error("QR Scan Error:", err);
      alert("Camera access failed or QR code not found. Please ensure camera permissions are granted.");
      setIsScanning(false);
    }
  };

  // Stop QR scanning
  const stopScan = () => {
    codeReader.current.reset();
    setIsScanning(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      codeReader.current.reset();
    };
  }, []);

  // Submit inspection result
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!scanResult) {
      alert("Please scan a component first!");
      return;
    }

    const newInspection = {
      id: inspectionHistory.length + 1,
      componentId: currentComponent?.batchId || "Unknown",
      type: currentComponent?.type || "Unknown",
      date: new Date().toISOString().split('T')[0],
      status: inspectionStatus,
      remarks: remarks,
      inspector: user?.name || "Current Inspector"
    };

    setInspectionHistory([newInspection, ...inspectionHistory]);
    alert(`Inspection Saved!\nComponent: ${currentComponent?.type || 'Unknown'}\nStatus: ${inspectionStatus}\nRemarks: ${remarks}`);
    
    // Reset form
    setInspectionStatus("");
    setRemarks("");
    setScanResult("");
    setCurrentComponent(null);
  };

  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh"
    },
    header: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    card: {
      background: "white",
      borderRadius: "10px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },
    scannerCard: {
      background: "white",
      borderRadius: "10px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      textAlign: "center"
    },
    video: {
      width: "100%",
      maxWidth: "400px",
      height: "300px",
      border: "2px solid #007bff",
      borderRadius: "10px",
      backgroundColor: "#000"
    },
    button: {
      padding: "12px 24px",
      margin: "5px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold"
    },
    primaryBtn: {
      backgroundColor: "#007bff",
      color: "white"
    },
    secondaryBtn: {
      backgroundColor: "#6c757d",
      color: "white"
    },
    successBtn: {
      backgroundColor: "#28a745",
      color: "white"
    },
    dangerBtn: {
      backgroundColor: "#dc3545",
      color: "white"
    },
    formGroup: {
      marginBottom: "20px"
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "bold",
      color: "#333"
    },
    select: {
      width: "100%",
      padding: "12px",
      border: "2px solid #e1e5e9",
      borderRadius: "8px",
      fontSize: "16px",
      backgroundColor: "white"
    },
    textarea: {
      width: "100%",
      padding: "12px",
      border: "2px solid #e1e5e9",
      borderRadius: "8px",
      fontSize: "16px",
      minHeight: "100px",
      resize: "vertical",
      boxSizing: "border-box"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "10px"
    },
    th: {
      background: "#f8f9fa",
      padding: "12px",
      textAlign: "left",
      borderBottom: "2px solid #dee2e6",
      fontWeight: "bold"
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #dee2e6"
    },
    componentInfo: {
      background: "#e3f2fd",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "20px",
      border: "1px solid #2196f3"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1>Inspector Dashboard</h1>
          <p>Welcome, {user?.name || user?.email}</p>
        </div>
        <button style={{...styles.button, ...styles.secondaryBtn}} onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* QR Scanner Section */}
      <div style={styles.scannerCard}>
        <h2>Scan Component QR Code</h2>
        
        <video 
          ref={videoRef} 
          style={styles.video}
          autoPlay
          playsInline
        />
        
        <div style={{ marginTop: "15px" }}>
          <button 
            onClick={startScan} 
            disabled={isScanning} 
            style={{...styles.button, ...styles.primaryBtn, marginRight: "10px"}}
          >
            {isScanning ? "Scanning..." : "Start Camera"}
          </button>
          
          <button 
            onClick={stopScan} 
            disabled={!isScanning}
            style={{...styles.button, ...styles.dangerBtn}}
          >
            Stop Camera
          </button>
        </div>

        {isScanning && (
          <p style={{ marginTop: "10px", color: "#007bff" }}>
            📷 Point camera at QR code to scan...
          </p>
        )}
      </div>

      {/* Scanned Component Info */}
      {scanResult && currentComponent && (
        <div style={styles.card}>
          <h3>Scanned Component Information</h3>
          <div style={styles.componentInfo}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
              <p><strong>Type:</strong> {currentComponent.type}</p>
              <p><strong>Batch ID:</strong> {currentComponent.batchId}</p>
              <p><strong>Supply Date:</strong> {currentComponent.supplyDate}</p>
              <p><strong>Warranty End:</strong> {currentComponent.warrantyEnd}</p>
              {currentComponent.supplier && <p><strong>Supplier:</strong> {currentComponent.supplier}</p>}
            </div>
          </div>

          {/* Inspection Form */}
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Inspection Status</label>
              <select
                style={styles.select}
                value={inspectionStatus}
                onChange={(e) => setInspectionStatus(e.target.value)}
                required
              >
                <option value="">-- Select Status --</option>
                <option value="OK">✅ OK - Good Condition</option>
                <option value="Minor Defect">⚠️ Minor Defect</option>
                <option value="Severe Defect">❌ Severe Defect</option>
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

            <button type="submit" style={{...styles.button, ...styles.successBtn}}>
              Save Inspection Report
            </button>
          </form>
        </div>
      )}

      {/* Show raw scanned data if no valid component found */}
      {scanResult && !currentComponent && (
        <div style={styles.card}>
          <h3>Scanned Data</h3>
          <div style={{ background: "#f8f9fa", padding: "10px", borderRadius: "5px" }}>
            <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{scanResult}</pre>
          </div>
          <p style={{ color: "#dc3545", marginTop: "10px" }}>
            ⚠️ Invalid QR Code format. Please scan a valid component QR code.
          </p>
        </div>
      )}

      {/* Inspection History */}
      <div style={styles.card}>
        <h2>Recent Inspections</h2>
        {inspectionHistory.length > 0 ? (
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
              {inspectionHistory.map((inspection) => (
                <tr key={inspection.id}>
                  <td style={styles.td}>{inspection.date}</td>
                  <td style={styles.td}>{inspection.componentId}</td>
                  <td style={styles.td}>{inspection.type}</td>
                  <td style={styles.td}>
                    <span style={{
                      padding: "6px 12px",
                      borderRadius: "12px",
                      backgroundColor: 
                        inspection.status === "OK" ? "#d4edda" : 
                        inspection.status === "Minor Defect" ? "#fff3cd" : "#f8d7da",
                      color: 
                        inspection.status === "OK" ? "#155724" : 
                        inspection.status === "Minor Defect" ? "#856404" : "#721c24",
                      fontSize: "12px",
                      fontWeight: "bold"
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
        ) : (
          <p>No inspections recorded yet.</p>
        )}
      </div>
    </div>
  );
};

export default InspectorDashboard;
