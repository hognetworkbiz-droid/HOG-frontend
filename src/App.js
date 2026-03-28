import React, { useState, useEffect } from 'react';
import { useAppState } from './hooks/useAppState';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import UserView from './components/UserView';
import AdminLoginView from './components/AdminLoginView';
import AdminDashboardView from './components/AdminDashboardView';

function AppContent() {
  const { appState, isLoading, error } = useAppState();
  const { isAuthenticated, logout, isLoading: isAuthLoading } = useAuth();
  const [currentView, setCurrentView] = useState('user');
  const [paymentCallback, setPaymentCallback] = useState(null);

  useEffect(() => {
    // If auth finishes loading and we are logged in, restore admin dashboard immediately
    if (!isAuthLoading && isAuthenticated() && currentView === 'user') {
      setCurrentView('admin-dashboard');
    }
  }, [isAuthLoading, isAuthenticated, currentView]);

  useEffect(() => {
    // Check for Paystack payment callback
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('reference') || urlParams.get('trxref');

    if (reference) {
      const email = sessionStorage.getItem('paymentEmail');
      if (email) {
        setPaymentCallback({ reference, email });
        // Clear the session storage
        sessionStorage.removeItem('paymentEmail');
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  const handleAdminLogin = () => {
    setCurrentView('admin-dashboard');
  };

  const handleAdminLogout = () => {
    logout();
    setCurrentView('user');
  };

  if (isLoading || isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    console.warn(error);
    // Continue with default data if API fails
  }

  return (
    <div className="relative">
      {/* Background Image Container */}
      <div
        id="bg-image-container"
        style={{
          backgroundImage: `url('${appState.bgDataUrl}')`,
        }}
      />

      {currentView === 'user' && (
        <UserView
          appState={appState}
          onAdminLoginClick={() => setCurrentView('admin-login')}
          paymentCallback={paymentCallback}
          onPaymentCallbackHandled={() => setPaymentCallback(null)}
        />
      )}

      {currentView === 'admin-login' && (
        <AdminLoginView
          appState={appState}
          onLoginSuccess={handleAdminLogin}
          onBackToUser={() => setCurrentView('user')}
        />
      )}

      {currentView === 'admin-dashboard' && isAuthenticated() && (
        <AdminDashboardView
          onLogout={handleAdminLogout}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
