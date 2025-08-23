# LancerScape Help & Support Module

<div align="center">
  <h1>🇮🇳 LancerScape Help & Support</h1>
  <p><strong>Comprehensive Help & Support System for Indian Freelancers</strong></p>
  
  ![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?logo=typescript)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-blue?logo=tailwindcss)
  ![Vite](https://img.shields.io/badge/Vite-5.4.2-purple?logo=vite)
</div>

## 🌟 Overview

LancerScape Help & Support is a comprehensive micro-frontend module designed specifically for Indian freelancers. It provides a complete customer support experience with features tailored to the Indian market, including GST compliance guidance, UPI payment support, and local regulations.

**Live Demo**: [https://lancerscape-help-sup-3h06.bolt.host](https://lancerscape-help-sup-3h06.bolt.host)

## 🎨 Design Theme

- **Background**: Clean White
- **Primary Text**: Charcoal Black (#222222)
- **Buttons & Highlights**: Bee Yellow (#FDB813)
- **Secondary Sections**: Light Gray (#F5F5F5)
- **Accent Elements**: Honey Orange (#FF9800)

## ✨ Features

### 🏠 Help Center Main Page
- **Hero Section** with search functionality
- **Quick Access Cards** for easy navigation
- **Popular FAQs** section with expandable answers
- **Popular Articles** showcase
- **Contact Options** with multiple support channels
- **Trust Indicators** showing platform statistics
- **Responsive Design** for all devices

### 📞 Contact Support System
- **Comprehensive Ticket Creation** with category selection
- **Priority Level Selection** (Low, Medium, High) with response times
- **File Upload Support** (up to 5 files, 10MB each)
- **Real-time Form Validation** using Zod schema
- **Previous Tickets Display** for logged-in users
- **Support Hours Information** with Indian timezone
- **Emergency Support** availability indicator

### ❓ FAQ System
- **Advanced Search** with fuzzy matching using Fuse.js
- **Category Filtering** for organized browsing
- **Voting System** (helpful/not helpful) for each FAQ
- **Tag-based Organization** for better discoverability
- **Expandable Answers** with smooth animations
- **Indian Context** - GST, UPI, Aadhaar, tax compliance

### 📚 Knowledge Base (Ready for Integration)
- **Article Management** with categorization
- **Search and Filter** functionality
- **View Tracking** and popularity metrics
- **Author Information** and publication dates
- **Responsive Card Layout** for articles

### 🔒 Legal Pages (Framework Ready)
- **Terms of Service** with table of contents
- **Privacy Policy** with section navigation
- **Print Functionality** for offline reference
- **Sticky Navigation** for easy browsing

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.2** - Fast build tool and dev server

### Styling & UI
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Headless UI 2.2.7** - Unstyled, accessible UI components
- **Lucide React 0.344.0** - Beautiful icon library
- **Framer Motion 12.23.12** - Smooth animations

### Forms & Validation
- **React Hook Form 7.62.0** - Performant forms with easy validation
- **Zod 4.0.17** - TypeScript-first schema validation
- **@hookform/resolvers 5.2.1** - Validation resolvers

### Data Management
- **TanStack Query 5.85.5** - Powerful data synchronization
- **Axios 1.11.0** - HTTP client with interceptors

### File Handling
- **React Dropzone 14.3.8** - Drag & drop file uploads

### Search & Filtering
- **Fuse.js 7.1.0** - Fuzzy search functionality

### User Experience
- **React Hot Toast 2.6.0** - Beautiful notifications

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd lancerscape-help-support
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://ec2-3-238-114-176.compute-1.amazonaws.com:3000
VITE_APP_NAME=LancerScape
VITE_SUPPORT_EMAIL=support@lancerscape.com
VITE_SUPPORT_PHONE=+91-8000-123-456
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```

### 6. Preview Production Build
```bash
npm run preview
```

## 🔌 API Integration

### Base Configuration
The application is configured to work with the LancerScape API:
- **Base URL**: `http://ec2-3-238-114-176.compute-1.amazonaws.com:3000`
- **Authentication**: Token-based (stored in localStorage)
- **Timeout**: 15 seconds
- **Error Handling**: Automatic retry and user-friendly messages

### Available Endpoints

#### Support Tickets
```typescript
// Create support ticket
POST /contact_us/contacts
{
  name: string,
  email: string,
  subject: string,
  description: string,
  phone_number?: string,
  priority: 'low' | 'medium' | 'high',
  attachments: string[]
}

// Get user tickets
GET /contact_us/contacts/my-tickets
Headers: { token: localStorage.getItem('token') }

// Admin view (if applicable)
GET /contact_us/contacts/admin-view
Headers: { token: localStorage.getItem('token') }
```

#### File Upload
```typescript
// Upload files
POST /upload
Content-Type: multipart/form-data
Headers: { token: localStorage.getItem('token') }
```

## 📁 Project Structure

```
src/
├── components/
│   ├── help/
│   │   ├── FAQSection.tsx          # FAQ display component
│   │   ├── PopularArticles.tsx     # Article showcase
│   │   ├── ContactOptions.tsx      # Support contact methods
│   │   ├── ArticleCard.tsx         # Individual article display
│   │   └── ArticleSearch.tsx       # Search and filter component
│   └── ui/
│       └── FileDropzone.tsx        # File upload component
├── contexts/
│   └── AuthContext.tsx             # Authentication context
├── lib/
│   └── axios.ts                    # API configuration
├── pages/
│   ├── HelpCenter.tsx              # Main help center page
│   ├── ContactSupport.tsx          # Support ticket creation
│   └── FAQ.tsx                     # FAQ page with search
├── types/
│   └── help.types.ts               # TypeScript interfaces
└── App.tsx                         # Main application component
```

## 🎯 Key Features for Indian Freelancers

### 📋 Localized Content
- **GST Compliance** guidance and FAQs
- **UPI Payment** support and troubleshooting
- **Aadhaar Verification** process explanation
- **FEMA Guidelines** for international payments
- **Tax Filing** assistance (ITR-3, ITR-4)
- **Bank Transfer** methods (NEFT, RTGS)

### 🕐 Indian Business Hours
- **Support Hours**: Monday-Friday, 9 AM - 6 PM IST
- **Saturday Support**: 10 AM - 2 PM IST
- **Emergency Support**: 24/7 for critical issues
- **Regional Holidays** consideration

### 💰 Indian Payment Context
- **INR Currency** support
- **Digital Wallets** (Paytm, PhonePe, GPay)
- **Banking Integration** with Indian banks
- **Tax Deduction** guidance
- **Invoice Generation** for GST compliance

## 🔧 Customization

### Theme Customization
Update `tailwind.config.js` to modify colors:
```javascript
theme: {
  extend: {
    colors: {
      yellow: {
        500: '#FDB813', // Bee Yellow
        600: '#E5A700', // Darker yellow
      },
      orange: {
        500: '#FF9800', // Honey Orange
        600: '#F57C00', // Darker orange
      }
    }
  }
}
```

### API Configuration
Modify `src/lib/axios.ts` for different API endpoints:
```typescript
const API_BASE_URL = 'your-api-endpoint';
```

### Content Localization
Update FAQ content in `src/pages/FAQ.tsx` and other components for different regions or languages.

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

- **ARIA Labels** for screen readers
- **Keyboard Navigation** support
- **Focus Management** for modals and forms
- **Color Contrast** compliance (WCAG 2.1)
- **Semantic HTML** structure

## 🚀 Deployment

### Netlify Deployment
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Vercel Deployment
```bash
npm run build
# Deploy using Vercel CLI or GitHub integration
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For technical support or questions:
- **Email**: support@lancerscape.com
- **Phone**: +91-8000-123-456
- **Documentation**: [Help Center](https://lancerscape-help-sup-3h06.bolt.host)

## 🙏 Acknowledgments

- **Indian Freelancer Community** for feedback and requirements
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first approach
- **Headless UI** for accessible components

---

<div align="center">
  <p>Made with ❤️ for Indian Freelancers</p>
  <p><strong>LancerScape - Empowering Indian Talent Globally</strong></p>
</div>