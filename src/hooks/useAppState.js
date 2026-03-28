import { useState, useEffect } from 'react';
import { getSiteSettings, getSitePlans } from '../services/api';

const defaultState = {
  siteName: 'HOG Network',
  logoDataUrl: '/img/logo.png',
  bgDataUrl: '/img/hog-background.jpg',
  whatsAppNumber: '+2349120461800',
  wifiUrl: 'http://192.168.1.253', // Added default WiFi redirect URL
  adminCredentials: {
    username: 'admin',
    password: 'admin123'
  },
  vouchers: [],
  issuedVouchers: [],
  dataPlans: [
    {
      data: '1GB',
      price: 320,
      validity: '24Hours',
      devices: 1,
      upload: 5,
      download: 8,
      paymentLink: 'https://paystack.shop/pay/asyhox1k9b'
    },
    {
      data: '2GB',
      price: 620,
      validity: '2Days',
      devices: 1,
      upload: 5,
      download: 8,
      paymentLink: ''
    },
    {
      data: '12GB',
      price: 3400,
      originalPrice: 3600, // Added to show discount badge
      validity: '12Days',
      devices: 1,
      upload: 5,
      download: 8,
      paymentLink: 'https://paystack.shop/pay/wl5obvswf8'
    },
    {
      data: '20GB',
      price: 5400,
      originalPrice: 5500, // Added to show discount badge
      validity: '30Days',
      devices: 1,
      upload: 5,
      download: 8,
      paymentLink: 'https://paystack.shop/pay/2w6t3iv586'
    }
  ],
  manualPayment: {
    bankName: 'OPAY BANK',
    accountNumber: '6142233479',
    accountName: 'KIZZY COMMUNICATION LINK'
  },
  notifications: 'Welcome to HOG Network! Please contact admin on WhatsApp after payment for your voucher code.',
  pendingPayments: []
};

export const useAppState = () => {
  const [appState, setAppState] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch site settings
        const settingsResponse = await getSiteSettings();
        const settings = settingsResponse.data;

        // Fetch data plans
        const plansResponse = await getSitePlans();
        const plans = plansResponse.data;

        // Transform plans to match current format
        const transformedPlans = plans.map((plan) => ({
          id: plan.id,
          data: plan.dataLimit,
          price: parseFloat(plan.price),
          originalPrice: plan.originalPrice ? parseFloat(plan.originalPrice) : null, // Support for discounts
          validity: plan.validity,
          devices: plan.devices || 1,
          upload: plan.upload || 5,
          download: plan.download || 8,
          paymentLink: plan.paymentLink || '',
          name: plan.name,
          isActive: plan.isActive
        }));

        setAppState((prevState) => ({
          ...prevState,
          siteName: settings.siteName || prevState.siteName,
          logoDataUrl: settings.logoUrl || prevState.logoDataUrl,
          bgDataUrl: settings.backgroundUrl || prevState.bgDataUrl,
          whatsAppNumber: settings.contactPhone || prevState.whatsAppNumber,
          contactEmail: settings.contactEmail,
          wifiUrl: settings.wifiUrl || prevState.wifiUrl, // Map the admin's custom WiFi URL
          manualPayment: {
            bankName: settings.manualPaymentBankName || prevState.manualPayment.bankName,
            accountNumber: settings.manualPaymentAccountNumber || prevState.manualPayment.accountNumber,
            accountName: settings.manualPaymentAccountName || prevState.manualPayment.accountName
          },
          notifications: settings.notifications || prevState.notifications,
          dataPlans: transformedPlans
        }));
      } catch (err) {
        console.error('Failed to fetch data from API: - useAppState.js:116', err);
        setError('Failed to load data from server. Using cached data.');
        // Keep default state on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addPendingPayment = (payment) => {
    setAppState((prevState) => ({
      ...prevState,
      pendingPayments: [...prevState.pendingPayments, payment]
    }));
  };

  const updateSettings = (newSettings) => {
    setAppState((prevState) => ({
      ...prevState,
      ...newSettings
    }));
  };

  const updateDataPlans = (newPlans) => {
    setAppState((prevState) => ({
      ...prevState,
      dataPlans: newPlans
    }));
  };

  const approvePendingPayment = (index) => {
    const payment = appState.pendingPayments[index];
    if (payment) {
      // Generate placeholder voucher (will be replaced by actual backend/Omada logic)
      const voucher = {
        code: Math.random().toString(36).substring(2, 15).toUpperCase(),
        plan: payment.planName,
        amount: payment.amount,
        phoneNumber: payment.phoneNumber,
        approvedAt: new Date().toISOString()
      };
      
      setAppState((prevState) => ({
        ...prevState,
        pendingPayments: prevState.pendingPayments.filter((_, i) => i !== index),
        issuedVouchers: [...prevState.issuedVouchers, voucher]
      }));
      return voucher;
    }
    return null;
  };

  const rejectPendingPayment = (index) => {
    setAppState((prevState) => ({
      ...prevState,
      pendingPayments: prevState.pendingPayments.filter((_, i) => i !== index)
    }));
  };

  return {
    appState,
    isLoading,
    error,
    addPendingPayment,
    updateSettings,
    updateDataPlans,
    approvePendingPayment,
    rejectPendingPayment
  };
};