import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FeaturesPage from "./pages/FeaturesPage";
import ComponentDetailsFromQR from "./pages/ComponentDetailsFromQR";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import VendorDashboard from "./components/Dashboard/VendorDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import InspectorDashboard from "./components/Dashboard/InspectorDashboard";
import QRScanner from "./components/QRScanner";
import ComponentDetailsPage from "./components/ComponentDetailsPage";
import "./App.css";

const AppContent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scannedComponentData, setScannedComponentData] = useState(null);
  const { user, logout, loading } = useAuth();

  // Check if URL is for component details from QR scan
  if (window.location.pathname === '/component-details') {
    return <ComponentDetailsFromQR />;
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.2rem",
        }}
      >
        Loading...
      </div>
    );
  }

  // Show appropriate dashboard based on user role
  if (user) {
    const userRole = user.role.toUpperCase();
    switch (userRole) {
      case "ADMIN":
        return <AdminDashboard user={user} onLogout={logout} />;
      case "VENDOR":
        return <VendorDashboard user={user} onLogout={logout} />;
      case "INSPECTOR":
        return <InspectorDashboard user={user} onLogout={logout} />;
      default:
        return (
          <HomePage
            onGetStarted={() => {}}
            user={user}
            onLogin={() => setShowLogin(true)}
            onLogout={logout}
          />
        );
    }
  }

  const handleGetStarted = () => {
    setShowLogin(true);
  };

  const handleQRScanResult = (qrData) => {
    setShowQRScanner(false);
    setScannedComponentData(qrData);
  };

  const handleCloseComponentDetails = () => {
    setScannedComponentData(null);
  };

  return (
    <div className="App">
      <HomePage
        onGetStarted={handleGetStarted}
        user={user}
        onLogin={() => setShowLogin(true)}
        onLogout={logout}
        onShowAbout={() => setShowAbout(true)}
        onShowContact={() => setShowContact(true)}
        onShowFeatures={() => setShowFeatures(true)}
        onShowQRScanner={() => setShowQRScanner(true)}
      />

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      {showAbout && (
        <AboutPage
          onClose={() => setShowAbout(false)}
          onLogin={() => {
            setShowAbout(false);
            setShowLogin(true);
          }}
        />
      )}

      {showContact && (
        <ContactPage
          onClose={() => setShowContact(false)}
          onLogin={() => {
            setShowContact(false);
            setShowLogin(true);
          }}
        />
      )}

      {showFeatures && (
        <FeaturesPage
          onClose={() => setShowFeatures(false)}
          onLogin={() => {
            setShowFeatures(false);
            setShowLogin(true);
          }}
        />
      )}

      {showQRScanner && (
        <QRScanner
          onScanResult={handleQRScanResult}
          onClose={() => setShowQRScanner(false)}
          isActive={showQRScanner}
        />
      )}

      {scannedComponentData && (
        <ComponentDetailsPage
          componentData={scannedComponentData}
          onClose={handleCloseComponentDetails}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;