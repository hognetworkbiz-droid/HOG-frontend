import React, { useState } from 'react';
import { useAppState } from '../hooks/useAppState';

function AdminVouchersTab({ appState, showToast }) {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [codes, setCodes] = useState('');
  const { appState: state, updateSettings } = useAppState();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedPlan || !codes.trim()) {
      showToast('Please select plan and enter codes');
      return;
    }

    const voucherList = codes
      .split('\n')
      .map(c => c.trim())
      .filter(c => c)
      .map(code => ({
        code,
        plan: selectedPlan,
        used: false
      }));

    const updatedVouchers = [...state.vouchers, ...voucherList];
    updateSettings({ vouchers: updatedVouchers });
    
    showToast(`${voucherList.length} vouchers added for ${selectedPlan}`);
    setCodes('');
    setSelectedPlan('');
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-white">Manage Voucher Codes</h2>
        <p className="text-sm text-gray-400 mb-3">Enter one voucher code per line and select the associated data plan.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Select Plan</label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
            >
              <option value="">Choose a plan</option>
              {appState.dataPlans.map((plan, i) => (
                <option key={i} value={plan.data}>
                  {plan.data}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Voucher Codes</label>
            <textarea
              value={codes}
              onChange={(e) => setCodes(e.target.value)}
              placeholder="Enter codes (one per line)"
              rows="6"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full px-5 py-2 border border-transparent font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            Add Vouchers
          </button>
        </form>
      </div>

      {/* Vouchers List */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-white">Available Vouchers</h2>
        <div className="text-sm text-gray-400">
          Total: {state.vouchers.length} | Used: {state.vouchers.filter(v => v.used).length} | Available: {state.vouchers.filter(v => !v.used).length}
        </div>
      </div>
    </div>
  );
}

export default AdminVouchersTab;
