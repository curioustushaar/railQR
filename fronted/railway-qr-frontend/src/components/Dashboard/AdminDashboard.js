import React, { useState, useEffect } from 'react';
import { componentAPI } from "../../services/api";

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddUser, setShowAddUser] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Vendor', email: 'vendor@test.com', role: 'VENDOR', status: 'ACTIVE', lastLogin: '2024-09-10' },
    { id: 2, name: 'Jane Inspector', email: 'inspector@test.com', role: 'INSPECTOR', status: 'ACTIVE', lastLogin: '2024-09-11' },
    { id: 3, name: 'Mike Admin', email: 'admin@test.com', role: 'ADMIN', status: 'ACTIVE', lastLogin: '2024-09-12' }
  ]);

  // Dynamic components state from API
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Load all components from all users
  const loadAllComponents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to get all components via admin API
      const response = await componentAPI.getAllComponentsAdmin();
      
      if (response.success) {
        setComponents(response.components || []);
        console.log(`Loaded ${response.totalComponents} components from ${response.totalUsers} users`);
      } else {
        throw new Error('Failed to fetch components');
      }
    } catch (error) {
      console.error('Error loading components:', error);
      setError('Failed to load components from API. Using sample data.');
      
      // Fallback to sample data
      setComponents([
        { id: 1, type: 'Brake Pad', batchId: 'BP2024001', vendor: 'Railway Parts Co.', status: 'Active', addedBy: 'vendor@test.com', addedDate: '2024-09-10' },
        { id: 2, type: 'Wheel Assembly', batchId: 'WA2024002', vendor: 'Metro Wheels Ltd.', status: 'Active', addedBy: 'vendor@test.com', addedDate: '2024-09-11' },
        { id: 3, type: 'Rail Clip', batchId: 'RC2024003', vendor: 'Track Components Inc.', status: 'Pending', addedBy: 'inspector@test.com', addedDate: '2024-09-12' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Load components when component mounts
  useEffect(() => {
    loadAllComponents();
  }, []);

  // Dynamic inspections based on components
  const [inspections, setInspections] = useState([
    { id: 1, componentId: 'BP2024001', inspector: 'Jane Inspector', date: '2024-09-10', status: 'Passed', remarks: 'Good condition' },
    { id: 2, componentId: 'WA2024002', inspector: 'John Doe', date: '2024-09-11', status: 'Failed', remarks: 'Defective' },
    { id: 3, componentId: 'RC2024003', inspector: 'Jane Inspector', date: '2024-09-12', status: 'Passed', remarks: 'Satisfactory' }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'VENDOR',
    password: ''
  });

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
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '10px',
      padding: '25px',
      textAlign: 'center',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#3498db',
      marginBottom: '10px'
    },
    statLabel: {
      color: '#7f8c8d',
      fontSize: '1.1rem',
      fontWeight: '600'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '10px',
      padding: '25px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      marginBottom: '25px'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#2c3e50',
      margin: 0
    },
    button: {
      background: '#3498db',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: '600'
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
    activeBadge: {
      background: '#d4edda',
      color: '#155724'
    },
    inactiveBadge: {
      background: '#f8d7da',
      color: '#721c24'
    },
    pendingBadge: {
      background: '#fff3cd',
      color: '#856404'
    },
    failedBadge: {
      background: '#f8d7da',
      color: '#721c24'
    },
    actionBtn: {
      padding: '5px 10px',
      margin: '0 2px',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
      fontSize: '0.8rem'
    },
    deactivateBtn: {
      background: '#e74c3c',
      color: 'white'
    },
    activateBtn: {
      background: '#27ae60',
      color: 'white'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modalContent: {
      background: 'white',
      borderRadius: '10px',
      padding: '30px',
      width: '90%',
      maxWidth: '500px'
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
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '1rem',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '1rem',
      boxSizing: 'border-box'
    },
    modalButtons: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'flex-end',
      marginTop: '20px'
    },
    cancelBtn: {
      background: '#6c757d',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer'
    }
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.password) {
      const newUserObj = {
        id: users.length + 1,
        ...newUser,
        status: 'ACTIVE',
        lastLogin: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUserObj]);
      setNewUser({ name: '', email: '', role: 'VENDOR', password: '' });
      setShowAddUser(false);
      alert('User added successfully!');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleToggleUserStatus = (userId) => {
    console.log('Toggle status for user:', userId); // Debug log
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        alert(`User ${newStatus.toLowerCase()} successfully!`);
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  const renderOverview = () => (
    <>
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{users.length}</div>
          <div style={styles.statLabel}>Total Users</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{components.length}</div>
          <div style={styles.statLabel}>Total Components</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{inspections.length}</div>
          <div style={styles.statLabel}>Total Inspections</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{inspections.filter(i => i.status === 'Failed').length}</div>
          <div style={styles.statLabel}>Defective Components</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Recent System Activity</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Activity</th>
              <th style={styles.th}>User</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>2024-09-13</td>
              <td style={styles.td}>Component Inspection</td>
              <td style={styles.td}>Jane Inspector</td>
              <td style={styles.td}>
                <span style={{...styles.badge, ...styles.activeBadge}}>
                  Completed
                </span>
              </td>
            </tr>
            <tr>
              <td style={styles.td}>2024-09-12</td>
              <td style={styles.td}>New Component Added</td>
              <td style={styles.td}>John Vendor</td>
              <td style={styles.td}>
                <span style={{...styles.badge, ...styles.activeBadge}}>
                  Success
                </span>
              </td>
            </tr>
            <tr>
              <td style={styles.td}>2024-09-11</td>
              <td style={styles.td}>User Registration</td>
              <td style={styles.td}>System Admin</td>
              <td style={styles.td}>
                <span style={{...styles.badge, ...styles.activeBadge}}>
                  Approved
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );

  const renderUserManagement = () => (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>User Management</h3>
        <button style={styles.button} onClick={() => setShowAddUser(true)}>
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
          {users.map(user => (
            <tr key={user.id}>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>
                <span style={{
                  ...styles.badge,
                  ...(user.role === 'VENDOR' ? { background: '#d1ecf1', color: '#0c5460' } :
                      user.role === 'INSPECTOR' ? { background: '#fff3cd', color: '#856404' } :
                      { background: '#f8d7da', color: '#721c24' })
                }}>
                  {user.role}
                </span>
              </td>
              <td style={styles.td}>
                <span style={{
                  ...styles.badge,
                  ...(user.status === 'ACTIVE' ? styles.activeBadge : styles.inactiveBadge)
                }}>
                  {user.status}
                </span>
              </td>
              <td style={styles.td}>{user.lastLogin}</td>
              <td style={styles.td}>
                <button 
                  style={{
                    ...styles.actionBtn,
                    ...(user.status === 'ACTIVE' ? styles.deactivateBtn : styles.activateBtn)
                  }}
                  onClick={() => handleToggleUserStatus(user.id)}
                >
                  {user.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderComponents = () => (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>Component Management</h3>
        <button style={styles.button} onClick={loadAllComponents}>
          🔄 Refresh Components
        </button>
      </div>
      
      {/* Loading and Error States */}
      {loading && (
        <div style={{ 
          padding: "15px", 
          backgroundColor: "#fff3cd", 
          color: "#856404",
          borderRadius: "5px",
          margin: "10px 0"
        }}>
          🔄 Loading components...
        </div>
      )}
      
      {error && (
        <div style={{ 
          padding: "15px", 
          backgroundColor: "#f8d7da", 
          color: "#721c24",
          borderRadius: "5px",
          margin: "10px 0"
        }}>
          ⚠️ {error}
        </div>
      )}
      
      <div style={{ marginBottom: "15px", color: "#666" }}>
        📊 Total Components: {components.length} | Last Updated: {new Date().toLocaleTimeString()}
      </div>
      
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Batch ID</th>
            <th style={styles.th}>Supplier/Vendor</th>
            <th style={styles.th}>Added By</th>
            <th style={styles.th}>Date Added</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {components.length === 0 ? (
            <tr>
              <td style={styles.td} colSpan="7" align="center">
                {loading ? "Loading components..." : "No components found. Add components from vendor dashboard to see them here."}
              </td>
            </tr>
          ) : (
            components.map((component, index) => (
              <tr key={component.id || index}>
                <td style={styles.td}>{component.type}</td>
                <td style={styles.td}>
                  <strong>{component.batchId}</strong>
                </td>
                <td style={styles.td}>{component.vendor || component.supplier || 'Unknown'}</td>
                <td style={styles.td}>
                  <span style={{
                    padding: '3px 8px',
                    backgroundColor: '#e3f2fd',
                    color: '#1565c0',
                    borderRadius: '12px',
                    fontSize: '0.8rem'
                  }}>
                    {component.addedBy || 'Unknown'}
                  </span>
                </td>
                <td style={styles.td}>{component.addedDate || component.supplyDate || 'Unknown'}</td>
                <td style={styles.td}>{component.quantity || 'N/A'}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.badge,
                    ...(component.status === 'Active' ? styles.activeBadge : styles.pendingBadge)
                  }}>
                    {component.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  const renderInspections = () => {
    // Generate inspections from components' inspection history
    const allInspections = [];
    components.forEach(component => {
      if (component.inspectionHistory && component.inspectionHistory.length > 0) {
        component.inspectionHistory.forEach((inspection, index) => {
          allInspections.push({
            id: `${component.id}-${index}`,
            componentId: component.batchId,
            componentType: component.type,
            inspector: inspection.inspector,
            date: inspection.date,
            status: inspection.status,
            remarks: inspection.remarks,
            vendor: component.vendor || component.supplier
          });
        });
      }
    });
    
    // If no inspections from components, use default data
    const displayInspections = allInspections.length > 0 ? allInspections : inspections;
    
    return (
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>Recent Inspections</h3>
          <button style={styles.button} onClick={loadAllComponents}>
            🔄 Refresh Data
          </button>
        </div>
        
        <div style={{ marginBottom: "15px", color: "#666" }}>
          📋 Total Inspections: {displayInspections.length} | Real-time from component data
        </div>
        
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Component Type</th>
              <th style={styles.th}>Batch ID</th>
              <th style={styles.th}>Inspector</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Remarks</th>
              <th style={styles.th}>Vendor</th>
            </tr>
          </thead>
          <tbody>
            {displayInspections.length === 0 ? (
              <tr>
                <td style={styles.td} colSpan="7" align="center">
                  No inspection records found. Inspections will appear here when components are inspected.
                </td>
              </tr>
            ) : (
              displayInspections.map((inspection, index) => (
                <tr key={inspection.id || index}>
                  <td style={styles.td}>{inspection.componentType || 'N/A'}</td>
                  <td style={styles.td}>
                    <strong>{inspection.componentId}</strong>
                  </td>
                  <td style={styles.td}>{inspection.inspector}</td>
                  <td style={styles.td}>{inspection.date}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      ...(inspection.status === 'Passed' || inspection.status === 'OK' ? styles.activeBadge : 
                          inspection.status === 'Failed' ? styles.failedBadge : styles.pendingBadge)
                    }}>
                      {inspection.status}
                    </span>
                  </td>
                  <td style={styles.td}>{inspection.remarks}</td>
                  <td style={styles.td}>
                    <span style={{
                      padding: '3px 8px',
                      backgroundColor: '#f3e5f5',
                      color: '#7b1fa2',
                      borderRadius: '12px',
                      fontSize: '0.8rem'
                    }}>
                      {inspection.vendor || 'Unknown'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderAddUserModal = () => (
    <div style={styles.modal} onClick={() => setShowAddUser(false)}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Add New User</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name *</label>
          <input
            style={styles.input}
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            placeholder="Enter full name"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email *</label>
          <input
            style={styles.input}
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            placeholder="Enter email address"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Role *</label>
          <select
            style={styles.select}
            value={newUser.role}
            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
          >
            <option value="VENDOR">Vendor</option>
            <option value="INSPECTOR">Inspector</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password *</label>
          <input
            style={styles.input}
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
            placeholder="Enter password"
          />
        </div>
        <div style={styles.modalButtons}>
          <button style={styles.cancelBtn} onClick={() => setShowAddUser(false)}>
            Cancel
          </button>
          <button style={styles.button} onClick={handleAddUser}>
            Add User
          </button>
        </div>
      </div>
    </div>
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
            ...(activeTab === 'overview' ? styles.activeNavItem : {})
          }}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </div>
        <div 
          style={{
            ...styles.navItem,
            ...(activeTab === 'users' ? styles.activeNavItem : {})
          }}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </div>
        <div 
          style={{
            ...styles.navItem,
            ...(activeTab === 'components' ? styles.activeNavItem : {})
          }}
          onClick={() => setActiveTab('components')}
        >
          Components
        </div>
        <div 
          style={{
            ...styles.navItem,
            ...(activeTab === 'inspections' ? styles.activeNavItem : {})
          }}
          onClick={() => setActiveTab('inspections')}
        >
          Inspections
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.dashboardHeader}>
          <div>
            <h1 style={styles.title}>⚡ Admin Dashboard</h1>
            <p style={styles.subtitle}>Welcome, {user.name}</p>
          </div>
          <button style={styles.logoutBtn} onClick={onLogout}>
            Logout
          </button>
        </div>

        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUserManagement()}
        {activeTab === 'components' && renderComponents()}
        {activeTab === 'inspections' && renderInspections()}
      </div>

      {showAddUser && renderAddUserModal()}
    </div>
  );
};

export default AdminDashboard;