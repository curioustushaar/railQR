import React, { useState } from 'react';
import './App.css';
import AdminDashboard from './pages/AdminDashboard';
import InspectorDashboard from './pages/InspectorDashboard';
import VendorDashboard from './pages/VendorDashboard';
import Login from './pages/login';
import VerifyComponent from './components/VerifyComponent';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLogin = (user, role) => {
    setCurrentUser(user);
    setUserRole(role);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setCurrentView('dashboard');
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  // Navigation component for all user roles
  const Navigation = () => (
    <nav className="main-navigation">
      <button 
        onClick={() => handleViewChange('dashboard')}
        className={currentView === 'dashboard' ? 'active' : ''}
      >
        Dashboard
      </button>
      <button 
        onClick={() => handleViewChange('verify')}
        className={currentView === 'verify' ? 'active' : ''}
      >
        Verify Component
      </button>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </nav>
  );

  // Render content based on current view
  const renderContent = () => {
    if (currentView === 'verify') {
      return <VerifyComponent userRole={userRole} />;
    }

    switch (userRole) {
      case 'admin':
        return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
      case 'inspector':
        return <InspectorDashboard user={currentUser} onLogout={handleLogout} />;
      case 'vendor':
        return <VendorDashboard user={currentUser} onLogout={handleLogout} />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Railway QR System</h1>
        <div className="user-info">
          <span>Welcome, {currentUser.name} ({userRole})</span>
        </div>
      </header>
      <Navigation />
      <main className="app-main">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;