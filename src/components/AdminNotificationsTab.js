import React, { useState } from 'react';
import { useAppState } from '../hooks/useAppState';

function AdminNotificationsTab({ appState, showToast }) {
  const [message, setMessage] = useState(appState.notifications);
  const { updateSettings } = useAppState();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings({ notifications: message });
    showToast('Notification updated!');
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl">
      <h2 className="text-xl font-semibold mb-4 text-white">Send Notification to Users</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="6"
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full px-5 py-2 border border-transparent font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          Update Notification
        </button>
      </form>
    </div>
  );
}

export default AdminNotificationsTab;
