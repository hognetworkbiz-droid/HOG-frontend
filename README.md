# HOG Network React Website

A modern React application for HOG Network - a WiFi voucher management system with public user interface and admin dashboard. Integrated with backend API for real-time data management.

## 🚀 Features

- **User Dashboard**: Browse and purchase data plans
- **Payment Integration**: Paystack payment gateway for secure transactions
- **Manual Payment Option**: Bank transfer payment support
- **Admin Dashboard**: Comprehensive admin panel for management
  - General Settings
  - Data Plans Management
  - Payment Settings
  - Payment Approvals
  - Notifications Management
  - Voucher Management
  - Security & Credentials
- **Real-time API Integration**: Connected to backend API for live data
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **JWT Authentication**: Secure admin login with token management

## 🔌 API Integration

The app is fully integrated with the HOG Network backend API at `https://hognetwork.onrender.com/api`

### Available Endpoints

- **GET** `/site/settings` - Fetch public site configuration
- **GET** `/site/plans` - Fetch available data plans
- **POST** `/admin/login` - Admin authentication
- **POST** `/site/log-payment` - Log payment transactions

## 📋 Prerequisites

- Node.js v14+ 
- npm or yarn
- Modern web browser

## 🔧 Setup & Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/hog-website-react.git
cd hog-website-react
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```
The app will open at `http://localhost:3000`

4. **Build for production**
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.js               # Top navigation
│   ├── Footer.js               # Footer section
│   ├── DataPlansGrid.js        # Display data plans
│   ├── UserView.js             # Main user interface
│   ├── PaymentModal.js         # Payment form
│   ├── VoucherRetrievalForm.js # Voucher lookup
│   ├── AdminLoginView.js       # Admin login
│   ├── AdminDashboardView.js   # Admin main dashboard
│   ├── AdminSidebar.js         # Admin navigation
│   ├── AdminSettingsTab.js     # Site settings
│   ├── AdminPlansTab.js        # Plan management
│   ├── AdminPaymentTab.js      # Payment config
│   ├── AdminApprovalsTab.js    # Approve payments
│   ├── AdminNotificationsTab.js # Manage notifications
│   ├── AdminVouchersTab.js     # Manage vouchers
│   └── AdminSecurityTab.js     # Change credentials
├── contexts/           # React Context
│   └── AuthContext.js          # Authentication state
├── hooks/             # Custom React hooks
│   └── useAppState.js          # App state management
├── services/          # API services
│   └── api.js                  # Axios API client
├── App.js             # Main App component
├── index.js           # React entry point
└── index.css          # Global styles
```

## 🔐 Authentication

### Admin Login
- The app includes admin authentication with JWT tokens
- Tokens are stored in localStorage and automatically included in API requests
- Expired tokens trigger automatic logout and page refresh

### Credentials
Replace with your actual backend credentials when deploying

## 💳 Payment Processing

- **Paystack Integration**: Secure payment gateway for data plan purchases
- **Manual Payments**: Support for bank transfers with admin approval workflow
- **Voucher Generation**: Automatic voucher code generation on successful payment

## 🧪 Testing APIs

### Test Site Settings
```javascript
fetch('https://hognetwork.onrender.com/api/site/settings')
  .then(res => res.json())
  .then(data => console.log(data))
```

### Test Data Plans
```javascript
fetch('https://hognetwork.onrender.com/api/site/plans')
  .then(res => res.json())
  .then(data => console.log(data))
```

### Test Admin Login
```javascript
fetch('https://hognetwork.onrender.com/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'your-password'
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
```

## 📦 Dependencies

- **React** - UI framework
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build folder is ready for deployment. You can serve it with any static hosting:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Heroku

### Environment Variables

Create a `.env.local` file for environment-specific configuration:
```
REACT_APP_API_BASE_URL=https://hognetwork.onrender.com/api
```

## 📝 Git Setup

Before uploading to GitHub:

1. Initialize git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit: HOG Network React Website"
```

2. Add remote repository
```bash
git remote add origin https://github.com/yourusername/hog-website-react.git
git branch -M main
git push -u origin main
```

## 🐛 Troubleshooting

### App not loading
- Check browser console (F12) for errors
- Verify backend API is running
- Clear browser cache and localStorage

### API calls failing
- Ensure backend API URL is correct
- Check API request payload matches spec
- Verify CORS settings on backend

### Payment issues
- Ensure Paystack account is configured
- Test API endpoint directly in browser
- Check network tab for failed requests

## 📄 License

MIT License - feel free to use this project as reference

## 👤 Author

HOG Network Team

---

**Last updated:** March 2026

- **User View**: Browse data plans, submit manual payments, retrieve vouchers
- **Admin Dashboard**: Manage plans, settings, payments, notifications, vouchers, and credentials
- **Local Storage**: All data persists in browser localStorage
- **Responsive Design**: Built with Tailwind CSS
- **Dark Mode**: Complete dark theme styling

## Data Persistence

All data is stored in browser localStorage under the key `wifiVoucherSite`. This means data persists across sessions on the same device.

## Technologies

- React 18
- Tailwind CSS
- React Hooks (useState, useEffect)
- Local Storage API
