import React from 'react';

function PaymentSuccessModal({ paymentResult, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">Payment Successful!</h2>

          <div className="bg-gray-700 p-4 rounded-lg mb-6">
            <p className="text-gray-300 mb-2">Your voucher has been delivered to your email.</p>
            <p className="text-lg font-semibold text-green-400 mb-2">
              Voucher Code: <span className="bg-gray-600 px-2 py-1 rounded text-white">{paymentResult.voucherCode}</span>
            </p>
            <p className="text-sm text-gray-400">Plan: {paymentResult.plan}</p>
            <p className="text-sm text-gray-400">Reference: {paymentResult.paymentReference}</p>
          </div>

          <p className="text-sm text-gray-300 mb-6">
            Check your email for the voucher details. If you don't see it, check your spam folder.
          </p>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccessModal;