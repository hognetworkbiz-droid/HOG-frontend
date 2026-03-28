import React, { useState } from 'react';
import { useAppState } from '../hooks/useAppState';
import AdminSidebar from './AdminSidebar';
import AdminSettingsTab from './AdminSettingsTab';
import AdminPlansTab from './AdminPlansTab';
import AdminPaymentTab from './AdminPaymentTab';
import AdminApprovalsTab from './AdminApprovalsTab';
import AdminNotificationsTab from './AdminNotificationsTab';
import AdminVouchersTab from './AdminVouchersTab';
import AdminSecurityTab from './AdminSecurityTab';

function AdminDashboardView({ onLogout }) {
  const [activeTab, setActiveTab] = useState('settings');
  const [toast, setToast] = useState('');
  const { appState } = useAppState();

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  const tabs = {
    settings: { label: 'General Settings', icon: '⚙️', component: AdminSettingsTab },
    plans: { label: 'Data Plans', icon: '📊', component: AdminPlansTab },
    payment: { label: 'Payment Settings', icon: '💳', component: AdminPaymentTab },
    approvals: { label: 'Payment Approvals', icon: '✓', component: AdminApprovalsTab },
    notifications: { label: 'Notifications', icon: '🔔', component: AdminNotificationsTab },
    vouchers: { label: 'Vouchers', icon: '🎫', component: AdminVouchersTab },
    security: { label: 'Security', icon: '🔒', component: AdminSecurityTab }
  };

  const CurrentTab = tabs[activeTab]?.component;

  return (
    <div className="flex min-h-screen" style={{ display: 'flex' }}>
      <AdminSidebar
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={setActiveTab}
        onLogout={onLogout}
      />

      <main className="flex-1 p-8 bg-gray-950 overflow-y-auto">
        <h1 className="text-3xl font-bold text-white mb-6">{tabs[activeTab]?.label}</h1>

        {toast && (
          <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            {toast}
          </div>
        )}

        {CurrentTab && (
          <CurrentTab appState={appState} showToast={showToast} onLogout={onLogout} />
        )}
      </main>
    </div>
  );
}

export default AdminDashboardView;
