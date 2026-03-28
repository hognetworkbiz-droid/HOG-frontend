import React, { useState } from 'react';
import { useAppState } from '../hooks/useAppState';

function AdminPaymentTab({ appState, showToast }) {
  const [whatsappNumber, setWhatsappNumber] = useState(appState.whatsAppNumber);
  const [bankName, setBankName] = useState(appState.manualPayment.bankName);
  const [accountNumber, setAccountNumber] = useState(appState.manualPayment.accountNumber);
  const [accountName, setAccountName] = useState(appState.manualPayment.accountName);
  const { updateSettings } = useAppState();

  const handleContactSave = (e) => {
    e.preventDefault();
    updateSettings({ whatsAppNumber: whatsappNumber });
    showToast('Contact info saved!');
  };

  const handlePaymentSave = (e) => {
    e.preventDefault();
    updateSettings({
      manualPayment: { bankName, accountNumber, accountName }
    });
    showToast('Manual payment details saved!');
  };

  return (
    <div className="space-y-8">
      {/* Contact Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-white">Admin Contact</h2>
        <form onSubmit={handleContactSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">WhatsApp Number</label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full px-5 py-2 border border-transparent font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            Save Contact
          </button>
        </form>
      </div>

      {/* Manual Payment Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-white">Manual Payment Details</h2>
        <form onSubmit={handlePaymentSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Bank Name</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Account Name</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full px-5 py-2 border border-transparent font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            Save Payment Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminPaymentTab;
