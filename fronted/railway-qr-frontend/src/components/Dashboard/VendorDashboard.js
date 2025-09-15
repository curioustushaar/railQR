import React, { useState, useEffect } from "react";
import SimpleQRGenerator from "../SimpleQRGenerator";
import QRScanner from "../QRScanner";
import { componentAPI } from "../../services/api";

function VendorDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load components from API on component mount
  const loadComponents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await componentAPI.getAllComponents();
      
      if (response.success) {
        setComponents(response.components || []);
      } else {
        // Fallback to default components if API fails
        setComponents(getDefaultComponents());
      }
    } catch (error) {
      console.error('Error loading components:', error);
      setError('Failed to load components. Using offline mode.');
      // Fallback to default components
      setComponents(getDefaultComponents());
    } finally {
      setLoading(false);
    }
  };

  // Default components for fallback
  const getDefaultComponents = () => {
    return [
      {
        id: 1,
        type: "Brake Pad",
        batchId: "BP2024001",
        quantity: 50,
        supplyDate: "2024-01-15",
        warrantyEnd: "2026-01-15",
        supplier: "Railway Parts Co.",
        cost: "₹5,000",
        status: "Active",
        description: "High-performance brake pads for trains",
        specifications: "Material: Ceramic composite, Thickness: 15mm",
        inspectionHistory: [
          { date: "2024-01-20", inspector: "John Doe", status: "OK", remarks: "Good condition" },
          { date: "2024-06-15", inspector: "Jane Smith", status: "Minor Defect", remarks: "Small wear visible" }
        ]
      },
      {
        id: 2,
        type: "Wheel Assembly",
        batchId: "WA2024002",
        quantity: 25,
        supplyDate: "2024-02-10",
        warrantyEnd: "2027-02-10",
        supplier: "Metro Wheels Ltd.",
        cost: "₹50,000",
        status: "Active",
        description: "Complete wheel assembly for metro trains",
        specifications: "Diameter: 860mm, Material: Steel alloy",
        inspectionHistory: [
          { date: "2024-03-01", inspector: "Mike Wilson", status: "OK", remarks: "Perfect condition" }
        ]
      }
    ];
  };

  // Load components on component mount and when user changes
  useEffect(() => {
    loadComponents();
  }, [user?.email]);

  // Save components to localStorage whenever components change
  useEffect(() => {
    try {
      const userEmail = user?.email || 'default';
      const storageKey = `components_${userEmail}`;
      localStorage.setItem(storageKey, JSON.stringify(components));
      console.log(`Components saved for user: ${userEmail}`);
    } catch (error) {
      console.error('Error saving components to storage:', error);
    }
  }, [components, user?.email]);

  // Load components when user changes (re-login) - removed duplicate

  const [newComponent, setNewComponent] = useState({
    type: '',
    batchId: '',
    quantity: '',
    supplyDate: '',
    warrantyEnd: '',
    supplier: '',
    cost: '',
    description: '',
    specifications: ''
  });

  const handleViewDetails = (component) => {
    setSelectedComponent(component);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedComponent(null);
  };

  const handleAddComponent = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewComponent({
      type: '',
      batchId: '',
      quantity: '',
      supplyDate: '',
      warrantyEnd: '',
      supplier: '',
      cost: '',
      description: '',
      specifications: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComponent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitComponent = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!newComponent.type || !newComponent.batchId || !newComponent.quantity) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      
      // Convert newComponent to proper format for API
      const componentData = {
        type: newComponent.type,
        batchId: newComponent.batchId,
        quantity: parseInt(newComponent.quantity),
        supplyDate: newComponent.supplyDate,
        warrantyEnd: newComponent.warrantyEnd,
        supplier: newComponent.supplier,
        cost: newComponent.cost,
        description: newComponent.description,
        specifications: newComponent.specifications
      };

      const response = await componentAPI.addComponent(componentData);
      
      if (response.success) {
        // Update local state with new component
        setComponents(prev => [...prev, response.component]);
        alert(`Component "${newComponent.type}" added successfully! Total components: ${response.totalComponents}`);
        closeAddModal();
      } else {
        alert('Failed to add component: ' + (response.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error adding component:', error);
      if (error.message.includes('already exists')) {
        alert('A component with this Batch ID already exists. Please use a different Batch ID.');
      } else {
        alert('Failed to add component: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a Batch ID to search');
      return;
    }

    try {
      setLoading(true);
      const response = await componentAPI.searchComponent(searchQuery.trim());
      
      if (response.success && response.component) {
        setSearchResult(response.component);
      } else {
        setSearchResult(null);
        alert('No component found with this Batch ID');
      }
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to local search
      const found = components.find(comp => 
        comp.batchId.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (found) {
        setSearchResult(found);
      } else {
        setSearchResult(null);
        alert('No component found with this Batch ID');
      }
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResult(null);
  };

  const handleQRScan = (qrData) => {
    try {
      // Parse the QR text data
      let componentData = null;
      
      if (typeof qrData === 'string') {
        // Parse text format QR data
        const lines = qrData.split('\n');
        componentData = {};
        
        lines.forEach(line => {
          if (line.includes(':')) {
            const [key, value] = line.split(':').map(s => s.trim());
            switch(key.toLowerCase()) {
              case 'type':
                componentData.type = value;
                break;
              case 'batch id':
                componentData.batchId = value;
                break;
              case 'quantity':
                componentData.quantity = value;
                break;
              case 'supply date':
                componentData.supplyDate = value;
                break;
              case 'warranty':
                componentData.warrantyEnd = value;
                break;
              case 'supplier':
                componentData.supplier = value;
                break;
              case 'cost':
                componentData.cost = value;
                break;
            }
          }
        });
      } else {
        componentData = qrData;
      }
      
      setScannedData(componentData);
      setShowQRScanner(false);
      alert('QR Code scanned successfully! Component details loaded.');
      
    } catch (error) {
      alert('Error processing QR code data. Please try again.');
      console.error('QR parsing error:', error);
    }
  };

  const openQRScanner = () => {
    setShowQRScanner(true);
  };

  const closeQRScanner = () => {
    setShowQRScanner(false);
  };

  // Generate QR Code data
  const generateQRData = (component) => {
    return JSON.stringify({
      type: component.type,
      batchId: component.batchId,
      quantity: component.quantity,
      supplyDate: component.supplyDate,
      warrantyEnd: component.warrantyEnd,
      supplier: component.supplier,
      cost: component.cost,
      description: component.description,
      specifications: component.specifications,
      componentId: component.id,
      scannedAt: new Date().toISOString()
    });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '0'
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
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    activeNavItem: {
      borderBottom: '3px solid #3498db',
      background: 'rgba(52, 152, 219, 0.2)'
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>🚂 Railway QR System</div>
        <div style={styles.userInfo}>
          <span>Welcome, {user ? user.name : 'Vendor'} ({user ? user.role : 'Vendor'})</span>
          <button style={styles.logoutBtn} onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
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
            ...(activeTab === 'verify' ? styles.activeNavItem : {})
          }}
          onClick={() => setActiveTab('verify')}
        >
          Verify Component
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {activeTab === 'dashboard' && (
          <>
            <div style={styles.dashboardHeader}>
              <div>
                <h1 style={styles.title}>📦 Vendor Dashboard</h1>
                <p style={styles.subtitle}>Manage Components & Inventory</p>
                <div style={{ 
                  marginTop: "10px", 
                  padding: "8px 15px", 
                  backgroundColor: "#e3f2fd", 
                  borderRadius: "20px", 
                  display: "inline-block",
                  fontSize: "14px",
                  color: "#1565c0",
                  fontWeight: "600"
                }}>
                  📊 Total Components: {components.length} | User: {user?.email || 'Guest'}
                </div>
                
                {/* Loading and Error States */}
                {loading && (
                  <div style={{ 
                    padding: "10px 20px", 
                    backgroundColor: "#fff3cd", 
                    color: "#856404",
                    borderRadius: "5px",
                    margin: "10px 0"
                  }}>
                    🔄 Loading...
                  </div>
                )}
                
                {error && (
                  <div style={{ 
                    padding: "10px 20px", 
                    backgroundColor: "#f8d7da", 
                    color: "#721c24",
                    borderRadius: "5px",
                    margin: "10px 0"
                  }}>
                    ⚠️ {error}
                  </div>
                )}
              </div>
            </div>

            {/* Component Management Section */}
            <div style={{ 
              backgroundColor: "white", 
              borderRadius: "10px", 
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)", 
              overflow: "hidden",
              marginBottom: "20px"
            }}>
              <div style={{
                padding: "20px",
                borderBottom: "1px solid #dee2e6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f8f9fa"
              }}>
                <h2 style={{ margin: 0, color: "#2c3e50", fontSize: "1.5rem" }}>Component Management</h2>
                <button
                  onClick={handleAddComponent}
                  style={{
                    background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}
                >
                  Add New Component
                </button>
              </div>
              
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8f9fa" }}>
                    <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #dee2e6", fontWeight: "600" }}>Type</th>
                    <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #dee2e6", fontWeight: "600" }}>Batch ID</th>
                    <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #dee2e6", fontWeight: "600" }}>Quantity</th>
                    <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #dee2e6", fontWeight: "600" }}>Supply Date</th>
                    <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #dee2e6", fontWeight: "600" }}>Warranty End</th>
                    <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #dee2e6", fontWeight: "600" }}>Supplier</th>
                    <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #dee2e6", fontWeight: "600" }}>Cost</th>
                    <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #dee2e6", fontWeight: "600" }}>Status</th>
                    <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #dee2e6", fontWeight: "600" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {components.map((component) => (
                    <tr key={component.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td style={{ padding: "15px" }}>{component.type}</td>
                      <td style={{ padding: "15px" }}>{component.batchId}</td>
                      <td style={{ padding: "15px" }}>{component.quantity}</td>
                      <td style={{ padding: "15px" }}>{component.supplyDate}</td>
                      <td style={{ padding: "15px" }}>{component.warrantyEnd}</td>
                      <td style={{ padding: "15px" }}>{component.supplier}</td>
                      <td style={{ padding: "15px" }}>{component.cost}</td>
                      <td style={{ padding: "15px" }}>
                        <span style={{
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          backgroundColor: component.status === "Active" ? "#d4edda" : "#fff3cd",
                          color: component.status === "Active" ? "#155724" : "#856404",
                          fontWeight: "600"
                        }}>
                          {component.status}
                        </span>
                      </td>
                      <td style={{ padding: "15px" }}>
                        <button
                          onClick={() => handleViewDetails(component)}
                          style={{
                            padding: "8px 16px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "14px"
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'verify' && (
          <div style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "30px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ color: "#2c3e50", marginBottom: "30px", textAlign: "center" }}>🔍 Verify Component</h2>
            
            {/* QR Scanner Section */}
            <div style={{
              backgroundColor: "#e7f3ff",
              padding: "25px",
              borderRadius: "10px",
              marginBottom: "30px",
              border: "2px solid #007bff"
            }}>
              <h3 style={{ color: "#007bff", marginBottom: "15px", textAlign: "center" }}>📱 QR Code Scanner</h3>
              <p style={{ textAlign: "center", color: "#495057", marginBottom: "20px" }}>
                Click below to open camera and scan QR codes on components
              </p>
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={openQRScanner}
                  style={{
                    background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
                    color: "white",
                    border: "none",
                    padding: "15px 30px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "600",
                    boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)"
                  }}
                >
                  📷 Open QR Scanner
                </button>
              </div>
            </div>

            {/* Scanned Result Display */}
            {scannedData && (
              <div style={{
                backgroundColor: "#d4edda",
                border: "1px solid #c3e6cb",
                borderRadius: "10px",
                padding: "25px",
                marginBottom: "30px"
              }}>
                <h3 style={{ color: "#155724", marginBottom: "20px", textAlign: "center" }}>
                  ✅ QR Code Scanned Successfully!
                </h3>
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                  gap: "15px",
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px"
                }}>
                  <div>
                    <p><strong>Type:</strong> {scannedData.type || 'N/A'}</p>
                    <p><strong>Batch ID:</strong> {scannedData.batchId || 'N/A'}</p>
                    <p><strong>Quantity:</strong> {scannedData.quantity || 'N/A'}</p>
                  </div>
                  <div>
                    <p><strong>Supply Date:</strong> {scannedData.supplyDate || 'N/A'}</p>
                    <p><strong>Warranty End:</strong> {scannedData.warrantyEnd || 'N/A'}</p>
                    <p><strong>Supplier:</strong> {scannedData.supplier || 'N/A'}</p>
                  </div>
                  <div>
                    <p><strong>Cost:</strong> {scannedData.cost || 'N/A'}</p>
                    <p><strong>Status:</strong> 
                      <span style={{
                        marginLeft: "10px",
                        padding: "3px 10px",
                        borderRadius: "15px",
                        fontSize: "12px",
                        backgroundColor: "#d4edda",
                        color: "#155724",
                        fontWeight: "600"
                      }}>
                        Verified ✓
                      </span>
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <button
                    onClick={() => setScannedData(null)}
                    style={{
                      background: "#6c757d",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                      marginRight: "10px"
                    }}
                  >
                    Clear Results
                  </button>
                  <button
                    onClick={openQRScanner}
                    style={{
                      background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    Scan Another QR
                  </button>
                </div>
              </div>
            )}

            {/* Search Section */}
            <div style={{
              backgroundColor: "#f8f9fa",
              padding: "25px",
              borderRadius: "10px",
              marginBottom: "30px"
            }}>
              <h3 style={{ color: "#2c3e50", marginBottom: "20px" }}>🔍 Search by Batch ID</h3>
              <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="Enter Batch ID (e.g., BP2024001)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "12px 15px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontSize: "16px"
                  }}
                />
                <button
                  onClick={handleSearch}
                  style={{
                    background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                    color: "white",
                    border: "none",
                    padding: "12px 25px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "600"
                  }}
                >
                  🔍 Search
                </button>
                {searchResult && (
                  <button
                    onClick={clearSearch}
                    style={{
                      background: "#6c757d",
                      color: "white",
                      border: "none",
                      padding: "12px 20px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "16px"
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Search Results */}
            {searchResult ? (
              <div style={{
                backgroundColor: "#d4edda",
                border: "1px solid #c3e6cb",
                borderRadius: "10px",
                padding: "20px"
              }}>
                <h3 style={{ color: "#155724", marginBottom: "20px" }}>✅ Component Found</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
                  <div>
                    <p><strong>Type:</strong> {searchResult.type}</p>
                    <p><strong>Batch ID:</strong> {searchResult.batchId}</p>
                    <p><strong>Quantity:</strong> {searchResult.quantity}</p>
                    <p><strong>Supplier:</strong> {searchResult.supplier}</p>
                  </div>
                  <div>
                    <p><strong>Supply Date:</strong> {searchResult.supplyDate}</p>
                    <p><strong>Warranty End:</strong> {searchResult.warrantyEnd}</p>
                    <p><strong>Cost:</strong> {searchResult.cost}</p>
                    <p><strong>Status:</strong> 
                      <span style={{
                        marginLeft: "10px",
                        padding: "3px 10px",
                        borderRadius: "15px",
                        fontSize: "12px",
                        backgroundColor: "#d4edda",
                        color: "#155724"
                      }}>
                        {searchResult.status}
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleViewDetails(searchResult)}
                  style={{
                    background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}
                >
                  View Full Details
                </button>
              </div>
            ) : searchQuery && (
              <div style={{
                backgroundColor: "#f8d7da",
                border: "1px solid #f5c6cb",
                borderRadius: "10px",
                padding: "20px",
                textAlign: "center"
              }}>
                <h3 style={{ color: "#721c24" }}>❌ No Component Found</h3>
                <p style={{ color: "#721c24" }}>No component found with Batch ID: "{searchQuery}"</p>
              </div>
            )}

            {/* Instructions */}
            {!searchQuery && !scannedData && (
              <div style={{
                backgroundColor: "#e2e3e5",
                border: "1px solid #d6d8db",
                borderRadius: "10px",
                padding: "30px",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "48px", marginBottom: "20px" }}>📱</div>
                <h3 style={{ color: "#495057", marginBottom: "15px" }}>Component Verification Methods</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
                  <div style={{ padding: "15px", backgroundColor: "white", borderRadius: "8px" }}>
                    <h4 style={{ color: "#007bff", marginBottom: "10px" }}>📷 QR Scanner</h4>
                    <p style={{ fontSize: "14px", color: "#6c757d" }}>
                      Use your phone camera to scan QR codes on components for instant verification
                    </p>
                  </div>
                  <div style={{ padding: "15px", backgroundColor: "white", borderRadius: "8px" }}>
                    <h4 style={{ color: "#28a745", marginBottom: "10px" }}>🔍 Manual Search</h4>
                    <p style={{ fontSize: "14px", color: "#6c757d" }}>
                      Enter Batch ID manually to search and verify component details
                    </p>
                  </div>
                </div>
                <div style={{ fontSize: "14px", color: "#6c757d", marginTop: "20px" }}>
                  <p><strong>Available Batch IDs for testing:</strong></p>
                  <p>BP2024001 (Brake Pad) | WA2024002 (Wheel Assembly)</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Component Details Modal */}
        {showModal && selectedComponent && (
          <div style={{ 
            position: "fixed", 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: "rgba(0,0,0,0.5)", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            zIndex: 1000
          }}>
            <div style={{ 
              backgroundColor: "white", 
              padding: "0", 
              borderRadius: "15px", 
              maxWidth: "900px",
              width: "90%",
              maxHeight: "85vh",
              overflow: "auto",
              position: "relative",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
            }}>
              {/* Modal Header */}
              <div style={{
                padding: "20px 30px",
                borderBottom: "1px solid #dee2e6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f8f9fa"
              }}>
                <h3 style={{ margin: 0, color: "#2c3e50", fontSize: "1.5rem" }}>Component Details</h3>
                <button 
                  onClick={closeModal} 
                  style={{ 
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                    color: "#666",
                    padding: "5px"
                  }}
                >
                  ×
                </button>
              </div>
              
              <div style={{ padding: "30px", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" }}>
                {/* Left Side - Component Details */}
                <div>
                  <div style={{ marginBottom: "30px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                      <div>
                        <p style={{ margin: "8px 0", fontSize: "14px" }}>
                          <strong>Type:</strong> {selectedComponent.type}
                        </p>
                        <p style={{ margin: "8px 0", fontSize: "14px" }}>
                          <strong>Batch ID:</strong> {selectedComponent.batchId}
                        </p>
                        <p style={{ margin: "8px 0", fontSize: "14px" }}>
                          <strong>Quantity:</strong> {selectedComponent.quantity}
                        </p>
                        <p style={{ margin: "8px 0", fontSize: "14px" }}>
                          <strong>Supply Date:</strong> {selectedComponent.supplyDate}
                        </p>
                      </div>
                      <div>
                        <p style={{ margin: "8px 0", fontSize: "14px" }}>
                          <strong>Warranty End:</strong> {selectedComponent.warrantyEnd}
                        </p>
                        <p style={{ margin: "8px 0", fontSize: "14px" }}>
                          <strong>Supplier:</strong> {selectedComponent.supplier}
                        </p>
                        <p style={{ margin: "8px 0", fontSize: "14px" }}>
                          <strong>Cost:</strong> {selectedComponent.cost}
                        </p>
                      </div>
                    </div>
                    <p style={{ margin: "8px 0", fontSize: "14px" }}>
                      <strong>Description:</strong> {selectedComponent.description}
                    </p>
                    <p style={{ margin: "8px 0", fontSize: "14px" }}>
                      <strong>Specifications:</strong> {selectedComponent.specifications}
                    </p>
                  </div>

                  {/* Inspection History */}
                  <div>
                    <h4 style={{ color: "#2c3e50", marginBottom: "15px" }}>Inspection History</h4>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f8f9fa" }}>
                          <th style={{ padding: "10px", textAlign: "left", border: "1px solid #dee2e6" }}>Date</th>
                          <th style={{ padding: "10px", textAlign: "left", border: "1px solid #dee2e6" }}>Inspector</th>
                          <th style={{ padding: "10px", textAlign: "left", border: "1px solid #dee2e6" }}>Status</th>
                          <th style={{ padding: "10px", textAlign: "left", border: "1px solid #dee2e6" }}>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedComponent.inspectionHistory?.map((inspection, index) => (
                          <tr key={index}>
                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{inspection.date}</td>
                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{inspection.inspector}</td>
                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                              <span style={{
                                padding: "2px 8px",
                                borderRadius: "12px",
                                fontSize: "12px",
                                backgroundColor: inspection.status === "OK" ? "#d4edda" : "#fff3cd",
                                color: inspection.status === "OK" ? "#155724" : "#856404"
                              }}>
                                {inspection.status}
                              </span>
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{inspection.remarks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Side - QR Code */}
                <div style={{ textAlign: "center" }}>
                  <h4 style={{ color: "#2c3e50", marginBottom: "15px" }}>QR Code</h4>
                  <SimpleQRGenerator component={selectedComponent} size={200} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Component Modal */}
        {showAddModal && (
          <div style={{ 
            position: "fixed", 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: "rgba(0,0,0,0.5)", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            zIndex: 1000
          }}>
            <div style={{ 
              backgroundColor: "white", 
              padding: "30px", 
              borderRadius: "15px", 
              maxWidth: "600px",
              width: "90%",
              maxHeight: "85vh",
              overflow: "auto",
              position: "relative"
            }}>
              <button 
                onClick={closeAddModal} 
                style={{ 
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#666"
                }}
              >
                ×
              </button>
              
              <h3 style={{ color: "#2c3e50", marginBottom: "30px" }}>Add New Component</h3>
              
              <form onSubmit={handleSubmitComponent}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                      Component Type *
                    </label>
                    <input
                      type="text"
                      name="type"
                      value={newComponent.type}
                      onChange={handleInputChange}
                      placeholder="e.g., Brake Pad"
                      required
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        fontSize: "14px"
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                      Batch ID *
                    </label>
                    <input
                      type="text"
                      name="batchId"
                      value={newComponent.batchId}
                      onChange={handleInputChange}
                      placeholder="e.g., BP2024003"
                      required
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        fontSize: "14px"
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                      Quantity *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={newComponent.quantity}
                      onChange={handleInputChange}
                      placeholder="e.g., 50"
                      required
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        fontSize: "14px"
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                      Supply Date
                    </label>
                    <input
                      type="date"
                      name="supplyDate"
                      value={newComponent.supplyDate}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        fontSize: "14px"
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                      Warranty End Date
                    </label>
                    <input
                      type="date"
                      name="warrantyEnd"
                      value={newComponent.warrantyEnd}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        fontSize: "14px"
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                      Supplier
                    </label>
                    <input
                      type="text"
                      name="supplier"
                      value={newComponent.supplier}
                      onChange={handleInputChange}
                      placeholder="e.g., Railway Parts Co."
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        fontSize: "14px"
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                      Cost
                    </label>
                    <input
                      type="text"
                      name="cost"
                      value={newComponent.cost}
                      onChange={handleInputChange}
                      placeholder="e.g., ₹5,000"
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        fontSize: "14px"
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={newComponent.description}
                      onChange={handleInputChange}
                      placeholder="Brief description"
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        fontSize: "14px"
                      }}
                    />
                  </div>
                </div>
                
                <div style={{ marginTop: "20px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                    Specifications
                  </label>
                  <textarea
                    name="specifications"
                    value={newComponent.specifications}
                    onChange={handleInputChange}
                    placeholder="Technical specifications"
                    rows="3"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      fontSize: "14px",
                      resize: "vertical"
                    }}
                  />
                </div>
                
                <div style={{ marginTop: "30px", display: "flex", gap: "15px", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    onClick={closeAddModal}
                    style={{
                      background: "#6c757d",
                      color: "white",
                      border: "none",
                      padding: "12px 25px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                      color: "white",
                      border: "none",
                      padding: "12px 25px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "600"
                    }}
                  >
                    Add Component
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* QR Scanner Modal */}
        {showQRScanner && (
          <QRScanner
            onScanResult={handleQRScan}
            onClose={closeQRScanner}
            isActive={showQRScanner}
          />
        )}
      </div>
    </div>
  );
}

export default VendorDashboard;
