import React, { useState } from 'react';
import { useAppState } from '../hooks/useAppState';
import { updateAdminSettings } from '../services/api';

function AdminSettingsTab({ appState, showToast }) {
  const [siteName, setSiteName] = useState(appState.siteName || '');
  const [logoPreview, setLogoPreview] = useState(appState.logoDataUrl || '');
  const [bgPreview, setBgPreview] = useState(appState.bgDataUrl || '');
  const [logoFile, setLogoFile] = useState(null);
  const [bgFile, setBgFile] = useState(null);
  
  // also get other variables
  const [contactPhone, setContactPhone] = useState(appState.whatsAppNumber || '');
  const [contactEmail, setContactEmail] = useState(appState.contactEmail || '');
  const [bankName, setBankName] = useState(appState.manualPayment?.bankName || '');
  const [accountNumber, setAccountNumber] = useState(appState.manualPayment?.accountNumber || '');
  const [accountName, setAccountName] = useState(appState.manualPayment?.accountName || '');
  const [notifications, setNotifications] = useState(appState.notifications || '');

  const { updateSettings } = useAppState();

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'logo') setLogoFile(file);
    if (type === 'bg') setBgFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      if (type === 'logo') {
        setLogoPreview(dataUrl);
      } else if (type === 'bg') {
        setBgPreview(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (siteName) formData.append('siteName', siteName);
      if (contactPhone) formData.append('contactPhone', contactPhone);
      if (contactEmail) formData.append('contactEmail', contactEmail);
      if (bankName) formData.append('manualPaymentBankName', bankName);
      if (accountNumber) formData.append('manualPaymentAccountNumber', accountNumber);
      if (accountName) formData.append('manualPaymentAccountName', accountName);
      if (notifications) formData.append('notifications', notifications);
      
      if (logoFile) formData.append('logo', logoFile);
      if (bgFile) formData.append('background', bgFile);
      
      const res = await updateAdminSettings(formData);
      showToast('Site settings saved to backend!');
      // Update app state without reload if possible
      updateSettings(res.data);
    } catch (err) {
      console.error(err);
      showToast('Error saving settings to backend.');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Site Identity</h2>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Site Name</label>
            <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">WhatsApp Phone</label>
            <input type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Contact Email</label>
            <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white" />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mt-4 text-white">Manual Payment & Notifications</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Bank Name</label>
            <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Acc. Number</label>
            <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Acc. Name</label>
            <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300">Notifications</label>
          <textarea value={notifications} onChange={(e) => setNotifications(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white h-24"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, 'logo')}
            className="mt-1 block w-full"
          />
          {logoPreview && (
            <img src={logoPreview} alt="Logo Preview" className="mt-3 h-12 w-auto bg-gray-700 p-1 rounded" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Background Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, 'bg')}
            className="mt-1 block w-full"
          />
          {bgPreview && (
            <img src={bgPreview} alt="Background Preview" className="mt-3 h-24 w-auto bg-gray-700 p-1 rounded" />
          )}
        </div>

        <button
          type="submit"
          className="w-full px-5 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default AdminSettingsTab;
