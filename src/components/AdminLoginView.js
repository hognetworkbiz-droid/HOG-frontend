import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function AdminLoginView({ appState, onLoginSuccess, onBackToUser }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      onLoginSuccess();
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className="hidden min-h-screen flex items-center justify-center bg-gray-950 fixed inset-0 z-50 flex" style={{ display: 'flex' }}>
      <div className="w-full max-w-md bg-gray-800 shadow-2xl rounded-2xl p-8 m-4">
        <div className="flex justify-center mb-6">
          <img src={appState.logoDataUrl?.startsWith('/') ? appState.logoDataUrl.slice(1) : appState.logoDataUrl} alt="Logo" className="h-12 w-auto" />
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-6">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>

          <button
            type="button"
            onClick={onBackToUser}
            className="w-full mt-3 py-3 px-4 border border-gray-600 text-base font-medium rounded-lg text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Site
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginView;
