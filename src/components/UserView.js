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
    // Find the plan that was purchased (this is a simplified approach)
    // In a real app, you'd store the plan ID in sessionStorage during payment
    const planId = sessionStorage.getItem('paymentPlanId');
    const plan = appState.dataPlans.find(p => p.id === planId);

    if (plan) {
      try {
        // Import logPayment here to avoid circular dependency
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
        console.error('Payment processing failed:', error);
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

  return (
    <div className="relative min-h-screen">
      <Header
        logoUrl={appState.logoDataUrl}
        siteName={appState.siteName}
        onAdminLoginClick={onAdminLoginClick}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Voucher Retrieval */}
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
