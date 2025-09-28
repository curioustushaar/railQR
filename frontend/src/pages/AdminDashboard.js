import React, { useState, useEffect } from "react";

const AdminDashboard = ({ user, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [components, setComponents] = useState([]);
  const [inspections, setInspections] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "vendor",
    status: "active"
  });

  // Mock data
  useEffect(() => {
    const mockUsers = [
      { id: 1, name: "John Vendor", email: "vendor@test.com", role: "vendor", status: "active", lastLogin: "2024-09-10" },
      { id: 2, name: "Jane Inspector", email: "inspector@test.com", role: "inspector", status: "active", lastLogin: "2024-09-11" },
      { id: 3, name: "Mike Admin", email: "admin@test.com", role: "admin", status: "active", lastLogin: "2024-09-12" }
    ];

    const mockComponents = [
      { id: 1, type: "Brake Pad", batchId: "BP2024001", vendor: "Railway Parts Co.", status: "Active" },
      { id: 2, type: "Wheel Assembly", batchId: "WA2024002", vendor: "Metro Wheels Ltd.", status: "Active" },
      { id: 3, type: "Rail Clip", batchId: "RC2024003", vendor: "Track Components Inc.", status: "Pending" }
    ];

    const mockInspections = [
      { id: 1, componentId: "BP2024001", inspector: "Jane Inspector", date: "2024-09-10", status: "OK", remarks: "Good condition" },
      { id: 2, componentId: "WA2024002", inspector: "John Smith", date: "2024-09-11", status: "Minor Defect", remarks: "Small wear visible" },
      { id: 3, componentId: "RC2024003", inspector: "Jane Inspector", date: "2024-09-12", status: "Severe Defect", remarks: "Replacement needed" }
    ];

    setUsers(mockUsers);
    setComponents(mockComponents);
    setInspections(mockInspections);
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    const user = {
      id: users.length + 1,
      ...newUser,
      lastLogin: "Never"
    };
    setUsers([...users, user]);
    setNewUser({ name: "", email: "", role: "vendor", status: "active" });
    setShowAddUser(false);
    alert("User added successfully!");
  };

  const handleUserStatusToggle = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    ));
  };

  const getStats = () => {
    return {
      totalUsers: users.length,
      totalComponents: components.length,
      totalInspections: inspections.length,
      pendingInspections: inspections.filter(i => i.status === "Pending").length,
      defectiveComponents: inspections.filter(i => i.status === "Severe Defect").length
    };
  };

  const stats = getStats();

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
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
      marginBottom: "20px"
    },
    statCard: {
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      border: "1px solid #e1e5e9"
    },
    statNumber: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#007bff",
      margin: "10px 0"
    },
    tabs: {
      display: "flex",
      marginBottom: "20px",
      borderBottom: "2px solid #e1e5e9"
    },
    tab: {
      padding: "12px 24px",
      border: "none",
      background: "none",
      cursor: "pointer",
      fontSize: "16px",
      borderBottom: "2px solid transparent"
    },
    activeTab: {
      borderBottom: "2px solid #007bff",
      color: "#007bff",
      fontWeight: "bold"
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
    dangerBtn: {
      backgroundColor: "#dc3545",
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
      maxWidth: "500px",
      width: "90%"
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
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome, {user?.name || user?.email}</p>
        </div>
        <button style={{...styles.button, ...styles.secondaryBtn}} onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Stats Overview */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h3>Total Users</h3>
          <div style={styles.statNumber}>{stats.totalUsers}</div>
        </div>
        <div style={styles.statCard}>
          <h3>Total Components</h3>
          <div style={styles.statNumber}>{stats.totalComponents}</div>
        </div>
        <div style={styles.statCard}>
          <h3>Total Inspections</h3>
          <div style={styles.statNumber}>{stats.totalInspections}</div>
        </div>
        <div style={styles.statCard}>
          <h3>Defective Components</h3>
          <div style={styles.statNumber}>{stats.defectiveComponents}</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button 
          style={{...styles.tab, ...(activeTab === "overview" ? styles.activeTab : {})}}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button 
          style={{...styles.tab, ...(activeTab === "users" ? styles.activeTab : {})}}
          onClick={() => setActiveTab("users")}
        >
          User Management
        </button>
        <button 
          style={{...styles.tab, ...(activeTab === "components" ? styles.activeTab : {})}}
          onClick={() => setActiveTab("components")}
        >
          Components
        </button>
        <button 
          style={{...styles.tab, ...(activeTab === "inspections" ? styles.activeTab : {})}}
          onClick={() => setActiveTab("inspections")}
        >
          Inspections
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div style={styles.card}>
          <h2>System Overview</h2>
          <p>Welcome to the Railway QR Management System Admin Panel.</p>
          <p>Here you can manage users, monitor component inspections, and generate reports.</p>
          
          <h3>Recent Activity</h3>
          <ul>
            <li>New component "Rail Clip RC2024003" added by Track Components Inc.</li>
            <li>Inspection completed for "Brake Pad BP2024001" - Status: OK</li>
            <li>User "Jane Inspector" logged in</li>
            <li>Component "Wheel Assembly WA2024002" flagged for minor defect</li>
          </ul>
        </div>
      )}

      {activeTab === "users" && (
        <div style={styles.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2>User Management</h2>
            <button 
              style={{...styles.button, ...styles.primaryBtn}}
              onClick={() => setShowAddUser(true)}
            >
              Add New User
            </button>
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Last Login</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>
                    <span style={{
                      padding: "4px 8px",
                      borderRadius: "12px",
                      backgroundColor: user.role === "admin" ? "#f8d7da" : user.role === "inspector" ? "#fff3cd" : "#d4edda",
                      color: user.role === "admin" ? "#721c24" : user.role === "inspector" ? "#856404" : "#155724",
                      fontSize: "12px"
                    }}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      padding: "4px 8px",
                      borderRadius: "12px",
                      backgroundColor: user.status === "active" ? "#d4edda" : "#f8d7da",
                      color: user.status === "active" ? "#155724" : "#721c24",
                      fontSize: "12px"
                    }}>
                      {user.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={styles.td}>{user.lastLogin}</td>
                  <td style={styles.td}>
                    <button 
                      style={{...styles.button, ...(user.status === "active" ? styles.dangerBtn : styles.successBtn)}}
                      onClick={() => handleUserStatusToggle(user.id)}
                    >
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "components" && (
        <div style={styles.card}>
          <h2>Component Management</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Batch ID</th>
                <th style={styles.th}>Vendor</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {components.map((component) => (
                <tr key={component.id}>
                  <td style={styles.td}>{component.type}</td>
                  <td style={styles.td}>{component.batchId}</td>
                  <td style={styles.td}>{component.vendor}</td>
                  <td style={styles.td}>
                    <span style={{
                      padding: "4px 8px",
                      borderRadius: "12px",
                      backgroundColor: component.status === "Active" ? "#d4edda" : "#fff3cd",
                      color: component.status === "Active" ? "#155724" : "#856404",
                      fontSize: "12px"
                    }}>
                      {component.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "inspections" && (
        <div style={styles.card}>
          <h2>Inspection Reports</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Component ID</th>
                <th style={styles.th}>Inspector</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map((inspection) => (
                <tr key={inspection.id}>
                  <td style={styles.td}>{inspection.componentId}</td>
                  <td style={styles.td}>{inspection.inspector}</td>
                  <td style={styles.td}>{inspection.date}</td>
                  <td style={styles.td}>
                    <span style={{
                      padding: "4px 8px",
                      borderRadius: "12px",
                      backgroundColor: inspection.status === "OK" ? "#d4edda" : 
                                      inspection.status === "Minor Defect" ? "#fff3cd" : "#f8d7da",
                      color: inspection.status === "OK" ? "#155724" : 
                             inspection.status === "Minor Defect" ? "#856404" : "#721c24",
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
        </div>
      )}

      {/* Add User Modal */}
      {showAddUser && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Add New User</h3>
            <form onSubmit={handleAddUser}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  style={styles.input}
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  required
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  style={styles.input}
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Role</label>
                <select
                  style={styles.input}
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  required
                >
                  <option value="vendor">Vendor</option>
                  <option value="inspector">Inspector</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" style={{...styles.button, ...styles.successBtn}}>
                  Add User
                </button>
                <button 
                  type="button" 
                  style={{...styles.button, ...styles.secondaryBtn}}
                  onClick={() => setShowAddUser(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
