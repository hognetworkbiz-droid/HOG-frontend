import React from 'react';

function AdminSidebar({ tabs, activeTab, onTabClick, onLogout }) {
  return (
    <nav className="w-64 bg-gray-800 shadow-lg p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-8">
          <span className="text-xl font-bold text-white">Admin Panel</span>
        </div>

        <ul className="space-y-2">
          {Object.entries(tabs).map(([key, tab]) => (
            <li key={key}>
              <button
                onClick={() => onTabClick(key)}
                className={`w-full text-left flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === key
                    ? 'bg-gray-700 text-gray-300'
                    : 'text-gray-400 hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center px-4 py-3 text-base font-medium rounded-lg text-red-400 bg-red-900/50 hover:bg-red-800/60"
      >
        🚪 Logout
      </button>
    </nav>
  );
}

export default AdminSidebar;
