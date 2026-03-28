import React from 'react';

function Footer({ whatsAppNumber, siteName }) {
  const waLink = `https://wa.me/${whatsAppNumber.replace('+', '')}`;

  return (
    <footer className="bg-gray-900/80 backdrop-blur-md mt-12 py-6 shadow-inner-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 shadow-lg"
        >
          <svg className="h-6 w-6 mr-3 fill-white" viewBox="0 0 24 24">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.06 21.94L7.32 20.59C8.77 21.38 10.37 21.8 12.04 21.8H12.05C17.5 21.8 21.95 17.35 21.95 11.91C21.95 9.27 20.92 6.84 19.13 4.97C17.36 3.16 14.89 2.04 12.04 2.04ZM17.96 15.82C17.71 16.48 16.96 16.96 16.32 17.02C15.82 17.06 15.2 16.95 13.89 16.41C12.18 15.69 10.82 14.7 9.8 13.57C9.28 12.98 8.87 12.29 8.53 11.53C8.18 10.77 8.02 10.1 8.02 9.47C8.02 8.84 8.24 8.28 8.61 7.89C8.76 7.73 8.94 7.59 9.15 7.59C9.33 7.59 9.49 7.59 9.64 7.6C9.83 7.6 9.98 7.61 10.12 7.61C10.3 7.61 10.45 7.63 10.6 8.04C10.76 8.45 11.23 9.78 11.3 9.93C11.38 10.08 11.43 10.26 11.34 10.45C11.24 10.64 11.16 10.76 11.04 10.9C10.92 11.04 10.8 11.16 10.67 11.27C10.55 11.38 10.41 11.52 10.53 11.75C10.66 11.98 11.13 12.8 11.89 13.48C12.82 14.3 13.62 14.63 13.88 14.78C14.13 14.92 14.33 14.9 14.51 14.71C14.72 14.5 14.93 14.21 15.15 13.94C15.3 13.76 15.5 13.7 15.7 13.8C15.9 13.9 16.92 14.41 17.16 14.53C17.41 14.64 17.58 14.71 17.66 14.79C17.74 14.87 17.74 15.06 17.68 15.24C17.62 15.42 17.62 15.42 17.62 15.5C17.62 15.59 17.64 15.68 17.96 15.82Z" />
          </svg>
          Contact Admin on WhatsApp
        </a>
        <p className="mt-4 text-sm text-gray-400">
          After payment, please send your proof of payment to the admin on WhatsApp to receive your voucher code.
        </p>
        <p className="mt-4 text-xs text-gray-500">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
