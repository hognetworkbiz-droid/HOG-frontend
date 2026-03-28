import React, { useState, useEffect, useCallback } from 'react';
// import { useAppState } from '../hooks/useAppState';
import { logPayment } from '../services/api';

function PaymentModal({ plan, manualPayment, onClose, onSubmitManualPayment, onPaymentSuccess, appState }) {
  const [showManualPayment, setShowManualPayment] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  // const { addPendingPayment } = useAppState();

  const handlePaymentSuccess = useCallback(async (paymentReference) => {
    if (!email.trim()) {
      alert('Please enter your email address first');
      return;
    }

    setIsProcessingPayment(true);
    try {
      const paymentData = {
        paymentReference,
        email: email.trim(),
        dataPlanId: plan.id,
        amount: plan.price
      };

      const response = await logPayment(paymentData);
      setPaymentResult(response.data);

      alert(`Payment successful! Your voucher code is: ${response.data.voucherCode}`);
      onClose();

      // Call the success callback if provided
      if (onPaymentSuccess) {
        onPaymentSuccess(response.data);
      }
    } catch (error) {
      console.error('Payment logging failed:', error);
      alert('Payment was successful but there was an issue generating your voucher. Please contact admin.');
    } finally {
      setIsProcessingPayment(false);
    }
  }, [email, plan.id, plan.price, onClose, onPaymentSuccess]);

  // Check for Paystack callback parameters on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('reference');
    const trxref = urlParams.get('trxref');

    if (reference || trxref) {
      // Payment completed via Paystack
      handlePaymentSuccess(reference || trxref);
    }
  }, [handlePaymentSuccess]);

  const handleManualPaymentSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert('Please enter your email address for payment processing');
      return;
    }

    if (!phoneNumber.trim()) {
      alert('Please enter your phone number');
      return;
    }

    try {
      const paymentData = {
        paymentReference: 'MANUAL-' + Date.now().toString() + '-' + Math.floor(Math.random() * 1000),
        email: email.trim(),
        dataPlanId: plan.id,
        amount: plan.price,
        isManual: true,
        phoneNumber: phoneNumber
      };

      await logPayment(paymentData);
      
      onSubmitManualPayment();
      alert('Payment submitted! Admin will verify and approve shortly. Your voucher will be sent to your email.');
      onClose();
    } catch (error) {
      console.error('Failed to log manual payment', error);
      alert('Failed to submit manual payment. Please try again.');
    }
  };

  const handlePaystackClick = () => {
    if (!email.trim()) {
      alert('Please enter your email address for payment processing');
      return;
    }
    // Store email in session for payment completion
    sessionStorage.setItem('paymentEmail', email.trim());
    sessionStorage.setItem('paymentPlanId', plan.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-gray-800 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-white mb-4">Complete Your Payment</h2>

        {/* Plan Details */}
        <div className="bg-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-white">{plan.name || plan.data}</h3>
          <p className="text-3xl font-bold text-blue-400">₦{plan.price}</p>
          <p className="text-sm text-gray-300">Valid for {plan.validity}, {plan.devices} device(s)</p>
        </div>

        {/* Email Input for Payment Processing */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Email Address (Required)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
            placeholder="Enter your email for voucher delivery"
          />
        </div>

        {isProcessingPayment && (
          <div className="mb-4 p-4 bg-blue-900/50 border border-blue-500 rounded-lg">
            <p className="text-blue-300">Processing payment and generating voucher...</p>
          </div>
        )}

        {paymentResult && (
          <div className="mb-4 p-4 bg-green-900/50 border border-green-500 rounded-lg">
            <h3 className="text-green-300 font-semibold">Payment Successful!</h3>
            <p className="text-green-200">Voucher Code: <strong>{paymentResult.voucherCode}</strong></p>
            <p className="text-green-200">Plan: {paymentResult.plan}</p>
          </div>
        )}

        <p className="text-sm text-gray-300 mb-4">
          Choose your payment method. After payment, your voucher will be delivered automatically.
        </p>

        <div className="space-y-4">
          {/* Paystack */}
          <a
            href={plan.paymentLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handlePaystackClick}
            className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-lg"
          >
            Pay with Paystack
          </a>

          {/* Manual Payment */}
          <button
            onClick={() => setShowManualPayment(!showManualPayment)}
            className="w-full flex items-center justify-center px-6 py-4 border border-gray-600 text-lg font-medium rounded-lg text-gray-200 bg-gray-700 hover:bg-gray-600 shadow-md"
          >
            Manual Bank Transfer
          </button>

          {/* Manual Payment Details */}
          {showManualPayment && (
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 space-y-3">
              <h4 className="font-semibold text-gray-200">Bank Details:</h4>
              <p className="text-gray-300">
                <strong>Bank:</strong> {manualPayment.bankName}
              </p>
              <p className="text-gray-300">
                <strong>Account Number:</strong> {manualPayment.accountNumber}
              </p>
              <p className="text-gray-300">
                <strong>Account Name:</strong> {manualPayment.accountName}
              </p>

              <form onSubmit={handleManualPaymentSubmit} className="mt-4 space-y-3 border-t border-gray-700 pt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Your Phone Number</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                  />
                </div>
                <p className="text-sm font-medium text-yellow-400">
                  After transferring, send a screenshot to admin on WhatsApp with this number.
                </p>
                <button
                  type="submit"
                  className="w-full px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 shadow-lg"
                >
                  Submit Payment
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
