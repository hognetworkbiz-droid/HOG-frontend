import React, { useState, useEffect } from 'react';
import { getAdminPayments, approveAdminPayment, rejectAdminPayment } from '../services/api';

function AdminApprovalsTab({ appState, showToast }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = React.useCallback(async () => {
    try {
      const res = await getAdminPayments('pending');
      setPayments(res.data);
    } catch (e) {
      console.error(e);
      showToast('Error loading payments');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleApprove = async (id) => {
    try {
      const res = await approveAdminPayment(id);
      showToast(`Payment approved! Voucher: ${res.data.voucher?.code || 'None'}`);
      fetchPayments();
    } catch (e) {
      showToast(e.response?.data?.message || 'Error approving payment');
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectAdminPayment(id);
      showToast('Payment rejected');
      fetchPayments();
    } catch (e) {
      showToast(e.response?.data?.message || 'Error rejecting payment');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Manual Payment Approvals</h2>
      <p className="text-gray-300 mb-6">Review and approve manual bank transfer payments from users.</p>

      <div className="space-y-4">
        {loading ? (
          <p className="text-gray-400">Loading pending payments...</p>
        ) : payments.length === 0 ? (
          <p className="text-gray-400">No pending payments at this time.</p>
        ) : (
          payments.map((payment) => (
            <div key={payment.id} className="p-4 bg-gray-900/50 rounded-lg border border-yellow-700 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-200">{payment.dataPlan?.name} - ₦{payment.amount}</p>
                  <p className="text-sm text-gray-400">Email/Phone: {payment.customerEmail}</p>
                  <p className="text-xs text-gray-500">Submitted: {new Date(payment.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(payment.id)}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(payment.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminApprovalsTab;
