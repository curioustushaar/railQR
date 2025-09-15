import React, { useState, useEffect } from "react";import React, { useState, useEffect } from "react";

import QRCodeGenerator from "../components/QRCodeGenerator";import QRCodeGenerator from "../components/QRCodeGenerator";



const VendorDashboard = ({ user, onLogout }) => {const VendorDashboard = ({ user, onLogout }) => {

  const [components, setComponents] = useState([]);  const [components, setComponents] = useState([]);

  const [formData, setFormData] = useState({  const [formData, setFormData] = useState({

    type: "",    type: "",

    batchId: "",    batchId: "",

    quantity: "",    quantity: "", // Added quantity field

    supplyDate: "",    supplyDate: "",

    warrantyEnd: "",    warrantyEnd: "",

    description: "",    description: "",

    specifications: "",    specifications: "",

    supplier: "",    supplier: "",

    cost: ""    cost: ""

  });  });

  const [selectedComponent, setSelectedComponent] = useState(null);  const [selectedComponent, setSelectedComponent] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);  const [showAddForm, setShowAddForm] = useState(false);



  // Mock data with quantity  // Upda                <div style={{

  useEffect(() => {                  background: "linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)",

    const mockComponents = [                  color: "white",

      {                  padding: "12px 20px",

        id: 1,                  borderRadius: "25px",

        type: "Brake Pad",                  display: "inline-block",

        batchId: "BP2024001",                  marginBottom: "15px",

        quantity: 50,                  boxShadow: "0 4px 15px rgba(72, 198, 239, 0.3)"

        supplyDate: "2024-01-15",                }}>

        warrantyEnd: "2026-01-15",                  <span style={{ 

        description: "High-performance brake pads for trains",                    fontSize: "13px", 

        specifications: "Material: Ceramic composite, Thickness: 15mm",                    fontWeight: "600",

        supplier: "Railway Parts Co.",                    display: "flex",

        cost: "₹5,000",                    alignItems: "center",

        status: "Active",                    gap: "8px"

        inspectionHistory: [                  }}>

          { date: "2024-01-20", inspector: "John Doe", status: "OK", remarks: "Good condition" },                    📱 Scan with any phone camera or QR app

          { date: "2024-06-15", inspector: "Jane Smith", status: "Minor Defect", remarks: "Small wear visible" }                  </span>

        ]                </div>

      },                

      {                <div style={{

        id: 2,                  background: "rgba(46, 204, 113, 0.1)",

        type: "Wheel Assembly",                  border: "1px solid rgba(46, 204, 113, 0.3)",

        batchId: "WA2024002",                  borderRadius: "10px",

        quantity: 25,                  padding: "12px",

        supplyDate: "2024-02-10",                  marginBottom: "15px"

        warrantyEnd: "2027-02-10",                }}>

        description: "Complete wheel assembly for passenger trains",                  <p style={{

        specifications: "Diameter: 920mm, Material: Steel alloy",                    fontSize: "12px",

        supplier: "Metro Wheels Ltd.",                    color: "#27ae60",

        cost: "₹50,000",                    margin: "0",

        status: "Active",                    fontWeight: "600"

        inspectionHistory: [                  }}>

          { date: "2024-02-15", inspector: "Mike Johnson", status: "OK", remarks: "Perfect condition" }                    ✅ Phone Scanning Instructions:

        ]                  </p>

      }                  <p style={{

    ];                    fontSize: "11px",

    setComponents(mockComponents);                    color: "#2c3e50",

  }, []);                    margin: "5px 0 0 0",

                    lineHeight: "1.4"

  const handleInputChange = (e) => {                  }}>

    setFormData({                    1. Open camera app on your phone<br/>

      ...formData,                    2. Point at QR code<br/>

      [e.target.name]: e.target.value                    3. Tap notification to view details

    });                  </p>

  };                </div>quantity

  useEffect(() => {

  const handleSubmit = (e) => {    const mockComponents = [

    e.preventDefault();      {

    const newComponent = {        id: 1,

      id: components.length + 1,        type: "Brake Pad",

      ...formData,        batchId: "BP2024001",

      quantity: parseInt(formData.quantity),        quantity: 50, // Added quantity

      status: "Active",        supplyDate: "2024-01-15",

      inspectionHistory: []        warrantyEnd: "2026-01-15",

    };        description: "High-performance brake pads for trains",

    setComponents([...components, newComponent]);        specifications: "Material: Ceramic composite, Thickness: 15mm",

    setFormData({        supplier: "Railway Parts Co.",

      type: "",        cost: "₹5,000",

      batchId: "",        status: "Active",

      quantity: "",        inspectionHistory: [

      supplyDate: "",          { date: "2024-01-20", inspector: "John Doe", status: "OK", remarks: "Good condition" },

      warrantyEnd: "",          { date: "2024-06-15", inspector: "Jane Smith", status: "Minor Defect", remarks: "Small wear visible" }

      description: "",        ]

      specifications: "",      },

      supplier: "",      {

      cost: ""        id: 2,

    });        type: "Wheel Assembly",

    setShowAddForm(false);        batchId: "WA2024002",

    alert("Component added successfully!");        quantity: 25, // Added quantity

  };        supplyDate: "2024-02-10",

        warrantyEnd: "2027-02-10",

  const generateQRData = (component) => {        description: "Complete wheel assembly for passenger trains",

    // Create a URL that when scanned will show component details        specifications: "Diameter: 920mm, Material: Steel alloy",

    const componentData = {        supplier: "Metro Wheels Ltd.",

      id: component.id,        cost: "₹50,000",

      type: component.type,        status: "Active",

      batchId: component.batchId,        inspectionHistory: [

      quantity: component.quantity,          { date: "2024-02-15", inspector: "Mike Johnson", status: "OK", remarks: "Perfect condition" }

      supplyDate: component.supplyDate,        ]

      warrantyEnd: component.warrantyEnd,      }

      supplier: component.supplier,    ];

      cost: component.cost,    setComponents(mockComponents);

      description: component.description,  }, []);

      specifications: component.specifications,

      status: component.status  const handleInputChange = (e) => {

    };    setFormData({

          ...formData,

    // Encode component data in URL format for phone scanning      [e.target.name]: e.target.value

    const encodedData = btoa(JSON.stringify(componentData));    });

    const baseURL = window.location.origin;  };

    return `${baseURL}/component-details?data=${encodedData}`;

  };  const handleSubmit = (e) => {

    e.preventDefault();

  const styles = {    const newComponent = {

    container: {      id: components.length + 1,

      padding: "20px",      ...formData,

      backgroundColor: "#f8f9fa",      quantity: parseInt(formData.quantity), // Convert to number

      minHeight: "100vh"      status: "Active",

    },      inspectionHistory: []

    header: {    };

      background: "linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)",    setComponents([...components, newComponent]);

      color: "white",    setFormData({

      padding: "25px",      type: "",

      borderRadius: "15px",      batchId: "",

      marginBottom: "25px",      quantity: "", // Reset quantity

      display: "flex",      supplyDate: "",

      justifyContent: "space-between",      warrantyEnd: "",

      alignItems: "center",      description: "",

      backdropFilter: "blur(10px)",      specifications: "",

      boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",      supplier: "",

      border: "1px solid rgba(255, 255, 255, 0.2)"      cost: ""

    },    });

    card: {    setShowAddForm(false);

      background: "rgba(255, 255, 255, 0.95)",    alert("Component added successfully!");

      borderRadius: "15px",  };

      padding: "25px",

      marginBottom: "25px",  const generateQRData = (component) => {

      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",    // Create a URL that when scanned will show component details

      backdropFilter: "blur(10px)",    const componentData = {

      border: "1px solid rgba(255, 255, 255, 0.2)"      id: component.id,

    },      type: component.type,

    button: {      batchId: component.batchId,

      padding: "12px 24px",      quantity: component.quantity,

      margin: "5px",      supplyDate: component.supplyDate,

      border: "none",      warrantyEnd: component.warrantyEnd,

      borderRadius: "8px",      supplier: component.supplier,

      cursor: "pointer",      cost: component.cost,

      fontSize: "14px",      description: component.description,

      fontWeight: "600",      specifications: component.specifications,

      transition: "all 0.3s ease",      status: component.status

      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"    };

    },    

    primaryBtn: {    // Encode component data in URL format for phone scanning

      backgroundColor: "#007bff",    const encodedData = btoa(JSON.stringify(componentData));

      color: "white",    const baseURL = window.location.origin;

      background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)"    return `${baseURL}/component-details?data=${encodedData}`;

    },  };

    secondaryBtn: {

      backgroundColor: "#6c757d",  const styles = {

      color: "white",    container: {

      background: "linear-gradient(135deg, #6c757d 0%, #545b62 100%)"      padding: "20px",

    },      backgroundColor: "#f8f9fa",

    successBtn: {      minHeight: "100vh"

      backgroundColor: "#28a745",    },

      color: "white",    header: {

      background: "linear-gradient(135deg, #28a745 0%, #1e7e34 100%)"      background: "linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)",

    },      color: "white",

    table: {      padding: "25px",

      width: "100%",      borderRadius: "15px",

      borderCollapse: "collapse",      marginBottom: "25px",

      marginTop: "15px",      display: "flex",

      borderRadius: "10px",      justifyContent: "space-between",

      overflow: "hidden",      alignItems: "center",

      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"      backdropFilter: "blur(10px)",

    },      boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",

    th: {      border: "1px solid rgba(255, 255, 255, 0.2)"

      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",    },

      padding: "15px",    card: {

      textAlign: "left",      background: "rgba(255, 255, 255, 0.95)",

      fontWeight: "600",      borderRadius: "15px",

      color: "#495057",      padding: "25px",

      borderBottom: "2px solid #dee2e6"      marginBottom: "25px",

    },      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",

    td: {      backdropFilter: "blur(10px)",

      padding: "15px",      border: "1px solid rgba(255, 255, 255, 0.2)"

      borderBottom: "1px solid #dee2e6",    },

      backgroundColor: "rgba(255, 255, 255, 0.8)"    button: {

    },      padding: "12px 24px",

    formGroup: {      margin: "5px",

      marginBottom: "20px"      border: "none",

    },      borderRadius: "8px",

    label: {      cursor: "pointer",

      display: "block",      fontSize: "14px",

      marginBottom: "8px",      fontWeight: "600",

      fontWeight: "600",      transition: "all 0.3s ease",

      color: "#495057"      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"

    },    },

    input: {    primaryBtn: {

      width: "100%",      backgroundColor: "#007bff",

      padding: "12px",      color: "white",

      border: "2px solid #e9ecef",      background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)"

      borderRadius: "8px",    },

      boxSizing: "border-box",    secondaryBtn: {

      fontSize: "14px",      backgroundColor: "#6c757d",

      transition: "all 0.3s ease",      color: "white",

      backgroundColor: "rgba(255, 255, 255, 0.9)"      background: "linear-gradient(135deg, #6c757d 0%, #545b62 100%)"

    },    },

    modal: {    successBtn: {

      position: "fixed",      backgroundColor: "#28a745",

      top: 0,      color: "white",

      left: 0,      background: "linear-gradient(135deg, #28a745 0%, #1e7e34 100%)"

      right: 0,    },

      bottom: 0,    table: {

      backgroundColor: "rgba(0, 0, 0, 0.7)",      width: "100%",

      display: "flex",      borderCollapse: "collapse",

      alignItems: "center",      marginTop: "15px",

      justifyContent: "center",      borderRadius: "10px",

      zIndex: 1000,      overflow: "hidden",

      backdropFilter: "blur(5px)"      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"

    },    },

    modalContent: {    th: {

      background: "rgba(255, 255, 255, 0.98)",      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",

      padding: "35px",      padding: "15px",

      borderRadius: "20px",      textAlign: "left",

      maxWidth: "900px",      fontWeight: "600",

      maxHeight: "85vh",      color: "#495057",

      overflow: "auto",      borderBottom: "2px solid #dee2e6"

      width: "90%",    },

      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",    td: {

      backdropFilter: "blur(10px)",      padding: "15px",

      border: "1px solid rgba(255, 255, 255, 0.3)"      borderBottom: "1px solid #dee2e6",

    },      backgroundColor: "rgba(255, 255, 255, 0.8)"

    headerTitle: {    },

      fontSize: "2.2rem",    formGroup: {

      fontWeight: "700",      marginBottom: "20px"

      margin: "0 0 5px 0",    },

      textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"    label: {

    },      display: "block",

    headerSubtitle: {      marginBottom: "8px",

      fontSize: "1.1rem",      fontWeight: "600",

      opacity: "0.9",      color: "#495057"

      margin: "0",    },

      fontWeight: "400"    input: {

    },      width: "100%",

    logoutBtn: {      padding: "12px",

      background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",      border: "2px solid #e9ecef",

      color: "white",      borderRadius: "8px",

      padding: "12px 24px",      boxSizing: "border-box",

      border: "none",      fontSize: "14px",

      borderRadius: "8px",      transition: "all 0.3s ease",

      cursor: "pointer",      backgroundColor: "rgba(255, 255, 255, 0.9)"

      fontSize: "14px",    },

      fontWeight: "600",    modal: {

      transition: "all 0.3s ease",      position: "fixed",

      boxShadow: "0 4px 15px rgba(220, 53, 69, 0.3)"      top: 0,

    }      left: 0,

  };      right: 0,

      bottom: 0,

  return (      backgroundColor: "rgba(0, 0, 0, 0.7)",

    <div style={styles.container}>      display: "flex",

      <div style={styles.header}>      alignItems: "center",

        <div>      justifyContent: "center",

          <h1 style={styles.headerTitle}>🚂 Vendor Dashboard</h1>      zIndex: 1000,

          <p style={styles.headerSubtitle}>Welcome, {user?.name || user?.email}</p>      backdropFilter: "blur(5px)"

        </div>    },

        <button     modalContent: {

          style={styles.logoutBtn}      background: "rgba(255, 255, 255, 0.98)",

          onClick={onLogout}      padding: "35px",

        >      borderRadius: "20px",

          🚪 Logout      maxWidth: "700px",

        </button>      maxHeight: "85vh",

      </div>      overflow: "auto",

      width: "90%",

      <div style={styles.card}>      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>      backdropFilter: "blur(10px)",

          <h2 style={{ color: "#495057", fontSize: "1.8rem", fontWeight: "600", margin: "0" }}>      border: "1px solid rgba(255, 255, 255, 0.3)"

            🔧 Component Management    },

          </h2>    headerTitle: {

          <button       fontSize: "2.2rem",

            style={{...styles.button, ...styles.primaryBtn}}       fontWeight: "700",

            onClick={() => setShowAddForm(true)}      margin: "0 0 5px 0",

          >      textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"

            ➕ Add New Component    },

          </button>    headerSubtitle: {

        </div>      fontSize: "1.1rem",

      opacity: "0.9",

        <div style={{ overflowX: "auto" }}>      margin: "0",

          <table style={styles.table}>      fontWeight: "400"

            <thead>    },

              <tr>    logoutBtn: {

                <th style={styles.th}>🔧 Type</th>      background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",

                <th style={styles.th}>🏷️ Batch ID</th>      color: "white",

                <th style={styles.th}>📦 Quantity</th>      padding: "12px 24px",

                <th style={styles.th}>📅 Supply Date</th>      border: "none",

                <th style={styles.th}>⏰ Warranty End</th>      borderRadius: "8px",

                <th style={styles.th}>🏢 Supplier</th>      cursor: "pointer",

                <th style={styles.th}>💰 Cost</th>      fontSize: "14px",

                <th style={styles.th}>📊 Status</th>      fontWeight: "600",

                <th style={styles.th}>⚡ Actions</th>      transition: "all 0.3s ease",

              </tr>      boxShadow: "0 4px 15px rgba(220, 53, 69, 0.3)"

            </thead>    }

            <tbody>  };

              {components.map((component) => (

                <tr key={component.id} style={{ transition: "all 0.3s ease" }}>  // Add hover effects using CSS-in-JS

                  <td style={styles.td}>{component.type}</td>  const buttonHoverStyle = {

                  <td style={styles.td}>{component.batchId}</td>    transform: "translateY(-2px)",

                  <td style={styles.td}>{component.quantity}</td>    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)"

                  <td style={styles.td}>{component.supplyDate}</td>  };

                  <td style={styles.td}>{component.warrantyEnd}</td>

                  <td style={styles.td}>{component.supplier}</td>  const inputFocusStyle = {

                  <td style={styles.td}>{component.cost}</td>    borderColor: "#007bff",

                  <td style={styles.td}>    boxShadow: "0 0 0 3px rgba(0, 123, 255, 0.1)"

                    <span style={{  };

                      padding: "6px 12px",

                      borderRadius: "20px",  return (

                      backgroundColor: component.status === "Active" ? "#d4edda" : "#f8d7da",    <div style={styles.container}>

                      color: component.status === "Active" ? "#155724" : "#721c24",      <div style={styles.header}>

                      fontSize: "12px",        <div>

                      fontWeight: "600",          <h1 style={styles.headerTitle}>🚂 Vendor Dashboard</h1>

                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"          <p style={styles.headerSubtitle}>Welcome, {user?.name || user?.email}</p>

                    }}>        </div>

                      {component.status === "Active" ? "✅ Active" : "❌ Inactive"}        <button 

                    </span>          style={styles.logoutBtn}

                  </td>          onClick={onLogout}

                  <td style={styles.td}>          onMouseEnter={(e) => {

                    <button             e.target.style.transform = "translateY(-2px)";

                      style={{...styles.button, ...styles.primaryBtn, marginRight: "5px"}}            e.target.style.boxShadow = "0 6px 20px rgba(220, 53, 69, 0.4)";

                      onClick={() => setSelectedComponent(component)}          }}

                    >          onMouseLeave={(e) => {

                      👁️ View Details            e.target.style.transform = "translateY(0)";

                    </button>            e.target.style.boxShadow = "0 4px 15px rgba(220, 53, 69, 0.3)";

                  </td>          }}

                </tr>        >

              ))}          🚪 Logout

            </tbody>        </button>

          </table>      </div>

        </div>

      </div>      <div style={styles.card}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>

      {/* Add Component Modal */}          <h2 style={{ color: "#495057", fontSize: "1.8rem", fontWeight: "600", margin: "0" }}>

      {showAddForm && (            🔧 Component Management

        <div style={styles.modal}>          </h2>

          <div style={styles.modalContent}>          <button 

            <h3 style={{ color: "#495057", fontSize: "1.6rem", fontWeight: "600", marginBottom: "25px" }}>            style={{...styles.button, ...styles.primaryBtn}} 

              ➕ Add New Component            onClick={() => setShowAddForm(true)}

            </h3>            onMouseEnter={(e) => {

            <form onSubmit={handleSubmit}>              e.target.style.transform = "translateY(-2px)";

              <div style={styles.formGroup}>              e.target.style.boxShadow = "0 6px 20px rgba(0, 123, 255, 0.3)";

                <label style={styles.label}>🔧 Component Type</label>            }}

                <input            onMouseLeave={(e) => {

                  style={styles.input}              e.target.style.transform = "translateY(0)";

                  type="text"              e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";

                  name="type"            }}

                  value={formData.type}          >

                  onChange={handleInputChange}            ➕ Add New Component

                  required          </button>

                />        </div>

              </div>

                      {/* Enhanced table */}

              <div style={styles.formGroup}>        <div style={{ overflowX: "auto" }}>

                <label style={styles.label}>🏷️ Batch ID</label>          <table style={styles.table}>

                <input            <thead>

                  style={styles.input}              <tr>

                  type="text"                <th style={styles.th}>🔧 Type</th>

                  name="batchId"                <th style={styles.th}>🏷️ Batch ID</th>

                  value={formData.batchId}                <th style={styles.th}>📦 Quantity</th>

                  onChange={handleInputChange}                <th style={styles.th}>📅 Supply Date</th>

                  required                <th style={styles.th}>⏰ Warranty End</th>

                />                <th style={styles.th}>🏢 Supplier</th>

              </div>                <th style={styles.th}>💰 Cost</th>

                <th style={styles.th}>📊 Status</th>

              <div style={styles.formGroup}>                <th style={styles.th}>⚡ Actions</th>

                <label style={styles.label}>📦 Quantity</label>              </tr>

                <input            </thead>

                  style={styles.input}            <tbody>

                  type="number"              {components.map((component) => (

                  name="quantity"                <tr key={component.id} style={{ transition: "all 0.3s ease" }}>

                  value={formData.quantity}                  <td style={styles.td}>{component.type}</td>

                  onChange={handleInputChange}                  <td style={styles.td}>{component.batchId}</td>

                  min="1"                  <td style={styles.td}>{component.quantity}</td>

                  required                  <td style={styles.td}>{component.supplyDate}</td>

                />                  <td style={styles.td}>{component.warrantyEnd}</td>

              </div>                  <td style={styles.td}>{component.supplier}</td>

                  <td style={styles.td}>{component.cost}</td>

              <div style={styles.formGroup}>                  <td style={styles.td}>

                <label style={styles.label}>📅 Supply Date</label>                    <span style={{

                <input                      padding: "6px 12px",

                  style={styles.input}                      borderRadius: "20px",

                  type="date"                      backgroundColor: component.status === "Active" ? "#d4edda" : "#f8d7da",

                  name="supplyDate"                      color: component.status === "Active" ? "#155724" : "#721c24",

                  value={formData.supplyDate}                      fontSize: "12px",

                  onChange={handleInputChange}                      fontWeight: "600",

                  required                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"

                />                    }}>

              </div>                      {component.status === "Active" ? "✅ Active" : "❌ Inactive"}

                    </span>

              <div style={styles.formGroup}>                  </td>

                <label style={styles.label}>⏰ Warranty End Date</label>                  <td style={styles.td}>

                <input                    <button 

                  style={styles.input}                      style={{...styles.button, ...styles.primaryBtn, marginRight: "5px"}}

                  type="date"                      onClick={() => setSelectedComponent(component)}

                  name="warrantyEnd"                      onMouseEnter={(e) => {

                  value={formData.warrantyEnd}                        e.target.style.transform = "translateY(-2px)";

                  onChange={handleInputChange}                        e.target.style.boxShadow = "0 6px 20px rgba(0, 123, 255, 0.3)";

                  required                      }}

                />                      onMouseLeave={(e) => {

              </div>                        e.target.style.transform = "translateY(0)";

                        e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";

              <div style={styles.formGroup}>                      }}

                <label style={styles.label}>📝 Description</label>                    >

                <textarea                      👁️ View Details

                  style={styles.input}                    </button>

                  name="description"                  </td>

                  value={formData.description}                </tr>

                  onChange={handleInputChange}              ))}

                  rows="3"            </tbody>

                  required          </table>

                />        </div>

              </div>      </div>



              <div style={styles.formGroup}>      {/* Enhanced Add Component Modal */}

                <label style={styles.label}>⚙️ Specifications</label>      {showAddForm && (

                <textarea        <div style={styles.modal}>

                  style={styles.input}          <div style={styles.modalContent}>

                  name="specifications"            <h3 style={{ color: "#495057", fontSize: "1.6rem", fontWeight: "600", marginBottom: "25px" }}>

                  value={formData.specifications}              ➕ Add New Component

                  onChange={handleInputChange}            </h3>

                  rows="2"            <form onSubmit={handleSubmit}>

                  required              <div style={styles.formGroup}>

                />                <label style={styles.label}>🔧 Component Type</label>

              </div>                <input

                  style={styles.input}

              <div style={styles.formGroup}>                  type="text"

                <label style={styles.label}>🏢 Supplier</label>                  name="type"

                <input                  value={formData.type}

                  style={styles.input}                  onChange={handleInputChange}

                  type="text"                  onFocus={(e) => {

                  name="supplier"                    e.target.style.borderColor = "#007bff";

                  value={formData.supplier}                    e.target.style.boxShadow = "0 0 0 3px rgba(0, 123, 255, 0.1)";

                  onChange={handleInputChange}                  }}

                  required                  onBlur={(e) => {

                />                    e.target.style.borderColor = "#e9ecef";

              </div>                    e.target.style.boxShadow = "none";

                  }}

              <div style={styles.formGroup}>                  required

                <label style={styles.label}>💰 Cost</label>                />

                <input              </div>

                  style={styles.input}              

                  type="text"              <div style={styles.formGroup}>

                  name="cost"                <label style={styles.label}>🏷️ Batch ID</label>

                  value={formData.cost}                <input

                  onChange={handleInputChange}                  style={styles.input}

                  placeholder="₹"                  type="text"

                  required                  name="batchId"

                />                  value={formData.batchId}

              </div>                  onChange={handleInputChange}

                  onFocus={(e) => {

              <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>                    e.target.style.borderColor = "#007bff";

                <button type="submit" style={{...styles.button, ...styles.successBtn}}>                    e.target.style.boxShadow = "0 0 0 3px rgba(0, 123, 255, 0.1)";

                  ✅ Add Component                  }}

                </button>                  onBlur={(e) => {

                <button                     e.target.style.borderColor = "#e9ecef";

                  type="button"                     e.target.style.boxShadow = "none";

                  style={{...styles.button, ...styles.secondaryBtn}}                  }}

                  onClick={() => setShowAddForm(false)}                  required

                >                />

                  ❌ Cancel              </div>

                </button>

              </div>              <div style={styles.formGroup}>

            </form>                <label style={styles.label}>📦 Quantity</label>

          </div>                <input

        </div>                  style={styles.input}

      )}                  type="number"

                  name="quantity"

      {/* Component Details Modal with QR Code */}                  value={formData.quantity}

      {selectedComponent && (                  onChange={handleInputChange}

        <div style={styles.modal}>                  onFocus={(e) => {

          <div style={styles.modalContent}>                    e.target.style.borderColor = "#007bff";

            <h3 style={{ color: "#495057", fontSize: "1.6rem", fontWeight: "600", marginBottom: "25px" }}>                    e.target.style.boxShadow = "0 0 0 3px rgba(0, 123, 255, 0.1)";

              🔍 Component Details                  }}

            </h3>                  onBlur={(e) => {

                                e.target.style.borderColor = "#e9ecef";

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>                    e.target.style.boxShadow = "none";

              <div>                  }}

                <div style={{ marginBottom: "15px" }}>                  min="1"

                  <strong style={{ color: "#495057" }}>🔧 Type:</strong> {selectedComponent.type}                  required

                </div>                />

                <div style={{ marginBottom: "15px" }}>              </div>

                  <strong style={{ color: "#495057" }}>🏷️ Batch ID:</strong> {selectedComponent.batchId}

                </div>              <div style={styles.formGroup}>

                <div style={{ marginBottom: "15px" }}>                <label style={styles.label}>📅 Supply Date</label>

                  <strong style={{ color: "#495057" }}>📦 Quantity:</strong> {selectedComponent.quantity}                <input

                </div>                  style={styles.input}

                <div style={{ marginBottom: "15px" }}>                  type="date"

                  <strong style={{ color: "#495057" }}>📅 Supply Date:</strong> {selectedComponent.supplyDate}                  name="supplyDate"

                </div>                  value={formData.supplyDate}

                <div style={{ marginBottom: "15px" }}>                  onChange={handleInputChange}

                  <strong style={{ color: "#495057" }}>⏰ Warranty End:</strong> {selectedComponent.warrantyEnd}                  required

                </div>                />

                <div style={{ marginBottom: "15px" }}>              </div>

                  <strong style={{ color: "#495057" }}>🏢 Supplier:</strong> {selectedComponent.supplier}

                </div>              <div style={styles.formGroup}>

                <div style={{ marginBottom: "15px" }}>                <label style={styles.label}>⏰ Warranty End Date</label>

                  <strong style={{ color: "#495057" }}>💰 Cost:</strong> {selectedComponent.cost}                <input

                </div>                  style={styles.input}

                <div style={{ marginBottom: "15px" }}>                  type="date"

                  <strong style={{ color: "#495057" }}>📝 Description:</strong> {selectedComponent.description}                  name="warrantyEnd"

                </div>                  value={formData.warrantyEnd}

                <div style={{ marginBottom: "15px" }}>                  onChange={handleInputChange}

                  <strong style={{ color: "#495057" }}>⚙️ Specifications:</strong> {selectedComponent.specifications}                  required

                </div>                />

              </div>              </div>

              

              <div style={{ textAlign: "center" }}>              <div style={styles.formGroup}>

                <h4 style={{                 <label style={styles.label}>📝 Description</label>

                  color: "#495057",                 <textarea

                  marginBottom: "20px",                  style={styles.input}

                  fontSize: "1.4rem",                  name="description"

                  fontWeight: "600",                  value={formData.description}

                  display: "flex",                  onChange={handleInputChange}

                  alignItems: "center",                  rows="3"

                  justifyContent: "center",                  required

                  gap: "10px"                />

                }}>              </div>

                  📱 QR Code

                </h4>              <div style={styles.formGroup}>

                                <label style={styles.label}>⚙️ Specifications</label>

                <div style={{                 <textarea

                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",                   style={styles.input}

                  padding: "3px",                   name="specifications"

                  borderRadius: "20px",                  value={formData.specifications}

                  display: "inline-block",                  onChange={handleInputChange}

                  marginBottom: "15px"                  rows="2"

                }}>                  required

                  <div style={{                 />

                    background: "white",               </div>

                    padding: "15px", 

                    borderRadius: "17px",              <div style={styles.formGroup}>

                    display: "flex",                <label style={styles.label}>🏢 Supplier</label>

                    flexDirection: "column",                <input

                    alignItems: "center",                  style={styles.input}

                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"                  type="text"

                  }}>                  name="supplier"

                    <QRCodeGenerator                   value={formData.supplier}

                      data={generateQRData(selectedComponent)}                  onChange={handleInputChange}

                      size={200}                  required

                      style={{ margin: "0" }}                />

                    />              </div>

                  </div>

                </div>              <div style={styles.formGroup}>

                                <label style={styles.label}>💰 Cost</label>

                <div style={{                <input

                  background: "linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)",                  style={styles.input}

                  color: "white",                  type="text"

                  padding: "12px 20px",                  name="cost"

                  borderRadius: "25px",                  value={formData.cost}

                  display: "inline-block",                  onChange={handleInputChange}

                  marginBottom: "15px",                  placeholder="₹"

                  boxShadow: "0 4px 15px rgba(72, 198, 239, 0.3)"                  required

                }}>                />

                  <span style={{               </div>

                    fontSize: "13px", 

                    fontWeight: "600",              <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>

                    display: "flex",                <button type="submit" style={{...styles.button, ...styles.successBtn}}>

                    alignItems: "center",                  ✅ Add Component

                    gap: "8px"                </button>

                  }}>                <button 

                    📱 Scan with any phone camera or QR app                  type="button" 

                  </span>                  style={{...styles.button, ...styles.secondaryBtn}}

                </div>                  onClick={() => setShowAddForm(false)}

                                >

                <div style={{                  ❌ Cancel

                  background: "rgba(46, 204, 113, 0.1)",                </button>

                  border: "1px solid rgba(46, 204, 113, 0.3)",              </div>

                  borderRadius: "10px",            </form>

                  padding: "12px",          </div>

                  marginBottom: "15px"        </div>

                }}>      )}

                  <p style={{

                    fontSize: "12px",      {/* Enhanced Component Details Modal */}

                    color: "#27ae60",      {selectedComponent && (

                    margin: "0",        <div style={styles.modal}>

                    fontWeight: "600"          <div style={styles.modalContent}>

                  }}>            <h3 style={{ color: "#495057", fontSize: "1.6rem", fontWeight: "600", marginBottom: "25px" }}>

                    ✅ Phone Scanning Instructions:              🔍 Component Details

                  </p>            </h3>

                  <p style={{            

                    fontSize: "11px",            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>

                    color: "#2c3e50",              <div>

                    margin: "5px 0 0 0",                <div style={{ marginBottom: "15px" }}>

                    lineHeight: "1.4"                  <strong style={{ color: "#495057" }}>🔧 Type:</strong> {selectedComponent.type}

                  }}>                </div>

                    1. Open camera app on your phone<br/>                <div style={{ marginBottom: "15px" }}>

                    2. Point at QR code<br/>                  <strong style={{ color: "#495057" }}>🏷️ Batch ID:</strong> {selectedComponent.batchId}

                    3. Tap notification to view details                </div>

                  </p>                <div style={{ marginBottom: "15px" }}>

                </div>                  <strong style={{ color: "#495057" }}>📦 Quantity:</strong> {selectedComponent.quantity}

                                </div>

                <div style={{                <div style={{ marginBottom: "15px" }}>

                  marginTop: "15px",                  <strong style={{ color: "#495057" }}>📅 Supply Date:</strong> {selectedComponent.supplyDate}

                  fontSize: "11px",                </div>

                  color: "#6c757d",                <div style={{ marginBottom: "15px" }}>

                  lineHeight: "1.4"                  <strong style={{ color: "#495057" }}>⏰ Warranty End:</strong> {selectedComponent.warrantyEnd}

                }}>                </div>

                  <strong>Component:</strong> {selectedComponent.batchId}<br/>                <div style={{ marginBottom: "15px" }}>

                  <strong>Type:</strong> {selectedComponent.type}                  <strong style={{ color: "#495057" }}>🏢 Supplier:</strong> {selectedComponent.supplier}

                </div>                </div>

              </div>                <div style={{ marginBottom: "15px" }}>

            </div>                  <strong style={{ color: "#495057" }}>💰 Cost:</strong> {selectedComponent.cost}

                </div>

            <div style={{ marginTop: "30px" }}>                <div style={{ marginBottom: "15px" }}>

              <h4 style={{ color: "#495057", marginBottom: "20px" }}>🔍 Inspection History</h4>                  <strong style={{ color: "#495057" }}>📝 Description:</strong> {selectedComponent.description}

              {selectedComponent.inspectionHistory.length > 0 ? (                </div>

                <div style={{ overflowX: "auto" }}>                <div style={{ marginBottom: "15px" }}>

                  <table style={styles.table}>                  <strong style={{ color: "#495057" }}>⚙️ Specifications:</strong> {selectedComponent.specifications}

                    <thead>                </div>

                      <tr>              </div>

                        <th style={styles.th}>📅 Date</th>              

                        <th style={styles.th}>👨‍🔧 Inspector</th>              <div style={{ textAlign: "center" }}>

                        <th style={styles.th}>📊 Status</th>                <h4 style={{ 

                        <th style={styles.th}>📝 Remarks</th>                  color: "#495057", 

                      </tr>                  marginBottom: "20px",

                    </thead>                  fontSize: "1.4rem",

                    <tbody>                  fontWeight: "600",

                      {selectedComponent.inspectionHistory.map((inspection, index) => (                  display: "flex",

                        <tr key={index}>                  alignItems: "center",

                          <td style={styles.td}>{inspection.date}</td>                  justifyContent: "center",

                          <td style={styles.td}>{inspection.inspector}</td>                  gap: "10px"

                          <td style={styles.td}>                }}>

                            <span style={{                  🔗 QR Code

                              padding: "6px 12px",                </h4>

                              borderRadius: "20px",                

                              backgroundColor: inspection.status === "OK" ? "#d4edda" : "#fff3cd",                <div style={{ 

                              color: inspection.status === "OK" ? "#155724" : "#856404",                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 

                              fontSize: "12px",                  padding: "3px", 

                              fontWeight: "600"                  borderRadius: "20px",

                            }}>                  display: "inline-block",

                              {inspection.status === "OK" ? "✅ OK" : "⚠️ " + inspection.status}                  marginBottom: "15px"

                            </span>                }}>

                          </td>                  <div style={{ 

                          <td style={styles.td}>{inspection.remarks}</td>                    background: "white", 

                        </tr>                    padding: "15px", 

                      ))}                    borderRadius: "12px",

                    </tbody>                    display: "flex",

                  </table>                    flexDirection: "column",

                </div>                    alignItems: "center",

              ) : (                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"

                <p style={{ color: "#6c757d", fontStyle: "italic" }}>📋 No inspections recorded yet.</p>                  }}>

              )}                    <QRCodeGenerator 

            </div>                      data={generateQRData(selectedComponent)}

                      size={200}

            <button                       style={{ margin: "0" }}

              style={{...styles.button, ...styles.secondaryBtn, marginTop: "25px"}}                    />

              onClick={() => setSelectedComponent(null)}                  </div>

            >                </div>

              ❌ Close                

            </button>                <div style={{

          </div>                  background: "linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)",

        </div>                  color: "white",

      )}                  padding: "12px 20px",

    </div>                  borderRadius: "25px",

  );                  display: "inline-block",

};                  marginBottom: "15px",

                  boxShadow: "0 4px 15px rgba(72, 198, 239, 0.3)"

export default VendorDashboard;                }}>
                  <span style={{ 
                    fontSize: "13px", 
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    � Scan this QR code for component information
                  </span>
                </div>
                
                <button style={{
                  background: "linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "25px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(86, 171, 47, 0.3)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "0 auto"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(86, 171, 47, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(86, 171, 47, 0.3)";
                }}
                >
                  📊 Get QR Data
                </button>
                
                <div style={{
                  marginTop: "15px",
                  fontSize: "11px",
                  color: "#6c757d",
                  lineHeight: "1.4"
                }}>
                  <strong>Component:</strong> {selectedComponent.batchId}<br/>
                  <strong>Type:</strong> {selectedComponent.type}
                </div>
              </div>
            </div>

            <div style={{ marginTop: "30px" }}>
              <h4 style={{ color: "#495057", marginBottom: "20px" }}>🔍 Inspection History</h4>
              {selectedComponent.inspectionHistory.length > 0 ? (
                <div style={{ overflowX: "auto" }}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>📅 Date</th>
                        <th style={styles.th}>👨‍🔧 Inspector</th>
                        <th style={styles.th}>📊 Status</th>
                        <th style={styles.th}>📝 Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedComponent.inspectionHistory.map((inspection, index) => (
                        <tr key={index}>
                          <td style={styles.td}>{inspection.date}</td>
                          <td style={styles.td}>{inspection.inspector}</td>
                          <td style={styles.td}>
                            <span style={{
                              padding: "6px 12px",
                              borderRadius: "20px",
                              backgroundColor: inspection.status === "OK" ? "#d4edda" : "#fff3cd",
                              color: inspection.status === "OK" ? "#155724" : "#856404",
                              fontSize: "12px",
                              fontWeight: "600"
                            }}>
                              {inspection.status === "OK" ? "✅ OK" : "⚠️ " + inspection.status}
                            </span>
                          </td>
                          <td style={styles.td}>{inspection.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p style={{ color: "#6c757d", fontStyle: "italic" }}>📋 No inspections recorded yet.</p>
              )}
            </div>

            <button 
              style={{...styles.button, ...styles.secondaryBtn, marginTop: "25px"}}
              onClick={() => setSelectedComponent(null)}
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
