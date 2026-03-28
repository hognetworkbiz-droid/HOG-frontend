import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import DataPlansGrid from './DataPlansGrid';
import VoucherRetrievalForm from './VoucherRetrievalForm';
import PaymentModal from './PaymentModal';
import PaymentSuccessModal from './PaymentSuccessModal';
import Footer from './Footer';

function UserView({ appState, onAdminLoginClick, paymentCallback, onPaymentCallbackHandled }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePaymentCallback = useCallback(async (callback) => {
    // Find the plan that was purchased
    const planId = sessionStorage.getItem('paymentPlanId');
    const plan = appState.dataPlans.find(p => p.id === planId);

    if (plan) {
      try {
        const { logPayment } = await import('../services/api');
        const response = await logPayment({
          paymentReference: callback.reference,
          email: callback.email,
          dataPlanId: plan.id,
          amount: plan.price
        });

        setPaymentResult(response.data);
        setShowPaymentSuccess(true);
        onPaymentCallbackHandled();
        sessionStorage.removeItem('paymentPlanId');
      } catch (error) {
        console.error('Payment processing failed: - UserView.js:35', error);
        alert('Payment was successful but there was an issue. Please contact admin.');
      }
    }
  }, [appState.dataPlans, onPaymentCallbackHandled]);

  useEffect(() => {
    if (paymentCallback) {
      handlePaymentCallback(paymentCallback);
    }
  }, [paymentCallback, handlePaymentCallback]);

  const handleBuyPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setSelectedPlan(null);
  };

  const handlePaymentSuccess = (result) => {
    setPaymentResult(result);
    setShowPaymentSuccess(true);
    setShowPaymentModal(false);
  };

  // --- NEW: WiFi Redirect Logic ---
  const handleWifiRedirect = () => {
    // Check if the admin saved a custom URL in appState, otherwise use default OC300 IP
    let targetUrl = appState.wifiUrl || 'http://192.168.1.253';

    // Ensure it has http:// or https:// so the browser navigates correctly
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = 'http://' + targetUrl;
    }

    window.location.href = targetUrl;
  };

  return (
    <div className="relative min-h-screen">
      <Header
        logoUrl={appState.logoDataUrl}
        siteName={appState.siteName}
        onAdminLoginClick={onAdminLoginClick}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* NEW: Connect to WiFi Button */}
        <div className="mb-12 flex justify-center">
          <button
            onClick={handleWifiRedirect}
            className="inline-flex items-center justify-center px-10 py-5 border border-transparent text-xl font-bold rounded-2xl text-white bg-blue-600 hover:bg-blue-700 shadow-2xl transform transition hover:scale-105 duration-200"
          >
            <svg className="h-7 w-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12.55a11 11 0 0 1 14.08 0"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1.42 9a16 16 0 0 1 21.16 0"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
              <line x1="12" y1="20" x2="12.01" y2="20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></line>
            </svg>
            Connect to WiFi
          </button>
        </div>

        {/* Admin Notification */}
        {appState.notifications && appState.notifications.trim() && (
          <div className="mb-8 bg-blue-900/50 border-l-4 border-blue-500 text-blue-300 p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-3 fill-blue-300" viewBox="0 0 24 24">
                <path d="M9 21h6v-2H9v2zm3-18C6.48 3 4 5.48 4 8h3v7h2v-7h3V8c0-2.52-2.48-5-5-5zm7 6h3c0-2.52-2.48-5-5-5v5z" />
              </svg>
              <p className="font-bold">Admin Notification</p>
            </div>
            <p className="mt-2">{appState.notifications}</p>
          </div>
        )}

        {/* Data Plans */}
        <h1 className="text-3xl font-extrabold text-center mb-10 text-white">Our Data Plans</h1>
        <DataPlansGrid plans={appState.dataPlans} onBuyPlan={handleBuyPlan} />

        {/* Voucher Retrieval / Balance Checker */}
        <VoucherRetrievalForm plans={appState.dataPlans} />
      </main>

      <Footer
        whatsAppNumber={appState.whatsAppNumber}
        siteName={appState.siteName}
      />

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <PaymentModal
          plan={selectedPlan}
          manualPayment={appState.manualPayment}
          onClose={handleCloseModal}
          onSubmitManualPayment={() => {
            handleCloseModal();
          }}
          onPaymentSuccess={handlePaymentSuccess}
          appState={appState}
        />
      )}

      {/* Payment Success Modal */}
      {showPaymentSuccess && paymentResult && (
        <PaymentSuccessModal
          paymentResult={paymentResult}
          onClose={() => {
            setShowPaymentSuccess(false);
            setPaymentResult(null);
          }}
        />
      )}
    </div>
  );
}

export default UserView;