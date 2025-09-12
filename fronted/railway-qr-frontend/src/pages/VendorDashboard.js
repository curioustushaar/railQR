import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

const VendorDashboard = ({ user, onLogout }) => {
  const [components, setComponents] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    batchId: "",
    supplyDate: "",
    warrantyEnd: "",
    description: "",
    specifications: "",
    supplier: "",
    cost: ""
  });
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockComponents = [
      {
        id: 1,
        type: "Brake Pad",
        batchId: "BP2024001",
        supplyDate: "2024-01-15",
        warrantyEnd: "2026-01-15",
        description: "High-performance brake pads for trains",
        specifications: "Material: Ceramic composite, Thickness: 15mm",
        supplier: "Railway Parts Co.",
        cost: "₹5,000",
        status: "Active",
        inspectionHistory: [
          { date: "2024-01-20", inspector: "John Doe", status: "OK", remarks: "Good condition" },
          { date: "2024-06-15", inspector: "Jane Smith", status: "Minor Defect", remarks: "Small wear visible" }
        ]
      },
      {
        id: 2,
        type: "Wheel Assembly",
        batchId: "WA2024002",
        supplyDate: "2024-02-10",
        warrantyEnd: "2027-02-10",
        description: "Complete wheel assembly for passenger trains",
        specifications: "Diameter: 920mm, Material: Steel alloy",
        supplier: "Metro Wheels Ltd.",
        cost: "₹50,000",
        status: "Active",
        inspectionHistory: [
          { date: "2024-02-15", inspector: "Mike Johnson", status: "OK", remarks: "Perfect condition" }
        ]
      }
    ];
    setComponents(mockComponents);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComponent = {
      id: components.length + 1,
      ...formData,
      status: "Active",
      inspectionHistory: []
    };
    setComponents([...components, newComponent]);
    setFormData({
      type: "",
      batchId: "",
      supplyDate: "",
      warrantyEnd: "",
      description: "",
      specifications: "",
      supplier: "",
      cost: ""
    });
    setShowAddForm(false);
    alert("Component added successfully!");
  };

  const generateQRData = (component) => {
    return JSON.stringify({
      type: component.type,
      batchId: component.batchId,
      supplyDate: component.supplyDate,
      warrantyEnd: component.warrantyEnd,
      supplier: component.supplier,
      id: component.id
    });
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
    button: {
      padding: "10px 20px",
      margin: "5px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px"
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
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "10px"
    },
    th: {
      background: "#f8f9fa",
      padding: "12px",
      textAlign: "left",
      borderBottom: "2px solid #dee2e6"
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #dee2e6"
    },
    formGroup: {
      marginBottom: "15px"
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold"
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      boxSizing: "border-box"
    },
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    },
    modalContent: {
      background: "white",
      padding: "30px",
      borderRadius: "10px",
      maxWidth: "600px",
      maxHeight: "80vh",
      overflow: "auto",
      width: "90%"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1>Vendor Dashboard</h1>
          <p>Welcome, {user?.name || user?.email}</p>
        </div>
        <button style={{...styles.button, ...styles.secondaryBtn}} onClick={onLogout}>
          Logout
        </button>
      </div>

      <div style={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2>Component Management</h2>
          <button 
            style={{...styles.button, ...styles.primaryBtn}} 
            onClick={() => setShowAddForm(true)}
          >
            Add New Component
          </button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Batch ID</th>
              <th style={styles.th}>Supply Date</th>
              <th style={styles.th}>Warranty End</th>
              <th style={styles.th}>Supplier</th>
              <th style={styles.th}>Cost</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {components.map((component) => (
              <tr key={component.id}>
                <td style={styles.td}>{component.type}</td>
                <td style={styles.td}>{component.batchId}</td>
                <td style={styles.td}>{component.supplyDate}</td>
                <td style={styles.td}>{component.warrantyEnd}</td>
                <td style={styles.td}>{component.supplier}</td>
                <td style={styles.td}>{component.cost}</td>
                <td style={styles.td}>
                  <span style={{
                    padding: "4px 8px",
                    borderRadius: "12px",
                    backgroundColor: component.status === "Active" ? "#d4edda" : "#f8d7da",
                    color: component.status === "Active" ? "#155724" : "#721c24",
                    fontSize: "12px"
                  }}>
                    {component.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <button 
                    style={{...styles.button, ...styles.primaryBtn, marginRight: "5px"}}
                    onClick={() => setSelectedComponent(component)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Component Modal */}
      {showAddForm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Add New Component</h3>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Component Type</label>
                <input
                  style={styles.input}
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Batch ID</label>
                <input
                  style={styles.input}
                  type="text"
                  name="batchId"
                  value={formData.batchId}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Supply Date</label>
                <input
                  style={styles.input}
                  type="date"
                  name="supplyDate"
                  value={formData.supplyDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Warranty End Date</label>
                <input
                  style={styles.input}
                  type="date"
                  name="warrantyEnd"
                  value={formData.warrantyEnd}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  style={styles.input}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Specifications</label>
                <textarea
                  style={styles.input}
                  name="specifications"
                  value={formData.specifications}
                  onChange={handleInputChange}
                  rows="2"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Supplier</label>
                <input
                  style={styles.input}
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Cost</label>
                <input
                  style={styles.input}
                  type="text"
                  name="cost"
                  value={formData.cost}
                  onChange={handleInputChange}
                  placeholder="₹"
                  required
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" style={{...styles.button, ...styles.successBtn}}>
                  Add Component
                </button>
                <button 
                  type="button" 
                  style={{...styles.button, ...styles.secondaryBtn}}
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Component Details Modal */}
      {selectedComponent && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Component Details</h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <p><strong>Type:</strong> {selectedComponent.type}</p>
                <p><strong>Batch ID:</strong> {selectedComponent.batchId}</p>
                <p><strong>Supply Date:</strong> {selectedComponent.supplyDate}</p>
                <p><strong>Warranty End:</strong> {selectedComponent.warrantyEnd}</p>
                <p><strong>Supplier:</strong> {selectedComponent.supplier}</p>
                <p><strong>Cost:</strong> {selectedComponent.cost}</p>
                <p><strong>Description:</strong> {selectedComponent.description}</p>
                <p><strong>Specifications:</strong> {selectedComponent.specifications}</p>
              </div>
              
              <div style={{ textAlign: "center" }}>
                <h4>QR Code</h4>
                <QRCodeCanvas
                  value={generateQRData(selectedComponent)}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="M"
                />
                <p style={{ fontSize: "12px", marginTop: "10px" }}>
                  Scan this QR code for component information
                </p>
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <h4>Inspection History</h4>
              {selectedComponent.inspectionHistory.length > 0 ? (
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Date</th>
                      <th style={styles.th}>Inspector</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedComponent.inspectionHistory.map((inspection, index) => (
                      <tr key={index}>
                        <td style={styles.td}>{inspection.date}</td>
                        <td style={styles.td}>{inspection.inspector}</td>
                        <td style={styles.td}>
                          <span style={{
                            padding: "4px 8px",
                            borderRadius: "12px",
                            backgroundColor: inspection.status === "OK" ? "#d4edda" : "#fff3cd",
                            color: inspection.status === "OK" ? "#155724" : "#856404",
                            fontSize: "12px"
                          }}>
                            {inspection.status}
                          </span>
                        </td>
                        <td style={styles.td}>{inspection.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No inspections recorded yet.</p>
              )}
            </div>

            <button 
              style={{...styles.button, ...styles.secondaryBtn, marginTop: "20px"}}
              onClick={() => setSelectedComponent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
