# ☕ Enzi Barista Station

<div align="center">

![Enzi Coffee Shop Logo](https://img.shields.io/badge/☕-Enzi%20Coffee%20Shop-8B4513?style=for-the-badge&logoColor=white)

**A Modern Point-of-Sale System for Coffee Shops**

_Streamline your coffee shop operations with our intuitive, fast, and reliable POS platform_

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat-square)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white)](https://www.prisma.io/)

</div>

---

## 📖 Table of Contents

- [🎯 What is Enzi Barista Station?](#-what-is-enzi-barista-station)
- [✨ Key Features](#-key-features)
- [🏗️ System Architecture](#️-system-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start Guide](#-quick-start-guide)
- [📁 Project Structure](#-project-structure)
- [🔧 Detailed Setup Instructions](#-detailed-setup-instructions)
- [📱 Usage Guide](#-usage-guide)
- [🔗 API Documentation](#-api-documentation)
- [🏢 Database Schema](#-database-schema)
- [🔐 Security Features](#-security-features)
- [🎨 UI/UX Design](#-uiux-design)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 What is Enzi Barista Station?

**Enzi Barista Station** is a comprehensive, modern Point-of-Sale (POS) system specifically designed for coffee shops and cafés. Our platform combines elegant design with powerful functionality to help coffee shop owners streamline their operations, process orders efficiently, and gain valuable insights into their business performance.

### 🌟 Why Choose Enzi?

- **🚀 Lightning Fast**: Built with modern web technologies for optimal performance
- **📱 Responsive Design**: Works seamlessly on desktops, tablets, and mobile devices
- **🔒 Secure**: Enterprise-grade security with JWT authentication and data encryption
- **📊 Analytics-Driven**: Comprehensive sales reporting and business insights
- **☕ Coffee-Focused**: Tailored specifically for coffee shop operations
- **🎨 Beautiful UI**: Minimalistic, professional design that's easy to use

---

## ✨ Key Features

### 🛒 **Point-of-Sale Operations**

- **Interactive Menu Grid**: Visual coffee menu with instant price display
- **Real-time Order Management**: Add, remove, and modify orders seamlessly
- **Order Summary & Confirmation**: Clear order review before processing
- **Digital Receipts**: Professional receipt generation and printing

### 👤 **User Management**

- **Secure Authentication**: JWT-based login system with HTTP-only cookies
- **User Registration**: Easy staff account creation and management
- **Protected Routes**: Role-based access control for different features

### 📈 **Sales Analytics & Reporting**

- **Daily Sales Dashboard**: Real-time revenue tracking and order metrics
- **Sales History**: Complete order history with filtering options
- **Top-Selling Items**: Insights into your most popular products
- **Revenue Analytics**: Detailed financial reporting and trends

### ☕ **Menu Management**

- **Static Coffee Menu**: Pre-configured with popular coffee drinks
  - Espresso ($25.00)
  - Latte ($35.00)
  - Cappuccino ($30.00)
  - Mocha ($40.00)
- **Price Management**: Easy pricing updates and modifications

### 🔧 **System Features**

- **Order Tracking**: Complete order lifecycle management
- **Receipt Generation**: Professional receipt printing capabilities
- **Error Handling**: Comprehensive error management and user feedback
- **Rate Limiting**: API protection against abuse

---

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph "Frontend (React + TypeScript)"
        A[Landing Page] --> B[Authentication]
        B --> C[POS Interface]
        B --> D[Sales Dashboard]
        C --> E[Menu Grid]
        C --> F[Order Management]
        D --> G[Analytics & Reports]
    end

    subgraph "Backend (Node.js + Express)"
        H[API Gateway] --> I[Auth Controller]
        H --> J[Menu Controller]
        H --> K[Order Controller]
        H --> L[Sales Controller]
        M[Auth Middleware] --> H
        N[Validation Middleware] --> H
    end

    subgraph "Database Layer"
        O[PostgreSQL] --> P[Prisma ORM]
        Q[User Data] --> O
        R[Order Data] --> O
    end

    A --> H
    C --> H
    D --> H
    H --> P
```

---

## 🛠️ Tech Stack

### **Frontend**

- **React 18** - Modern UI library with hooks and context
- **TypeScript** - Type-safe JavaScript for better development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **Lucide Icons** - Beautiful icon library

### **Backend**

- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **TypeScript** - Type safety for server-side code
- **Prisma ORM** - Next-generation database toolkit
- **PostgreSQL** - Reliable, powerful database
- **JWT** - Secure token-based authentication
- **bcryptjs** - Password hashing and security
- **Zod** - TypeScript-first schema validation

### **Security & Utilities**

- **Helmet** - Security headers and protection
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API abuse prevention
- **Morgan** - HTTP request logging
- **Cookie Parser** - Secure cookie handling

---

## 🚀 Quick Start Guide

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL** (v13 or higher)
- **Git** for version control

### ⚡ Quick Setup (5 minutes)

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/enzi-barista-station.git
   cd enzi-barista-station
   ```

2. **Install Dependencies**

   ```bash
   # Frontend dependencies
   npm install

   # Backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Environment Setup**

   ```bash
   # Backend environment
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Database Setup**

   ```bash
   cd backend
   npm run db:push    # Create database tables
   npm run db:seed    # Seed with sample data
   ```

5. **Start Development Servers**

   ```bash
   # Terminal 1: Backend server
   cd backend
   npm run dev

   # Terminal 2: Frontend server
   cd .. # Go back to root
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

## 📁 Project Structure

```
enzi-barista-station/
├── 📁 backend/                   # Backend API server
│   ├── 📁 src/
│   │   ├── 📁 controllers/       # Route handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── menu.controller.ts
│   │   │   ├── order.controller.ts
│   │   │   └── sales.controller.ts
│   │   ├── 📁 middleware/        # Custom middleware
│   │   │   ├── auth.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   └── validation.middleware.ts
│   │   ├── 📁 routes/            # API routes
│   │   │   ├── auth.routes.ts
│   │   │   ├── menu.routes.ts
│   │   │   ├── order.routes.ts
│   │   │   └── sales.routes.ts
│   │   ├── 📁 utils/             # Utility functions
│   │   │   ├── database.ts
│   │   │   ├── jwt.ts
│   │   │   ├── menu.ts
│   │   │   ├── password.ts
│   │   │   └── seed.ts
│   │   ├── 📁 types/             # TypeScript definitions
│   │   │   └── index.ts
│   │   └── server.ts             # Main server file
│   ├── 📁 prisma/
│   │   └── schema.prisma         # Database schema
│   ├── package.json
│   └── tsconfig.json
│
├── 📁 src/                       # Frontend React application
│   ├── 📁 components/
│   │   ├── 📁 auth/              # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── 📁 layout/            # Layout components
│   │   │   └── Header.tsx
│   │   ├── 📁 pos/               # POS system components
│   │   │   ├── CurrentOrder.tsx
│   │   │   ├── MenuGrid.tsx
│   │   │   ├── OrderSuccessModal.tsx
│   │   │   ├── OrderSummaryModal.tsx
│   │   │   └── PrintableReceipt.tsx
│   │   ├── 📁 sales/             # Sales & analytics
│   │   │   ├── OrderHistory.tsx
│   │   │   ├── ReceiptModal.tsx
│   │   │   ├── SalesDashboard.tsx
│   │   │   └── SalesFilters.tsx
│   │   └── 📁 ui/                # Reusable UI components
│   ├── 📁 contexts/              # React contexts
│   │   └── AuthContext.tsx
│   ├── 📁 hooks/                 # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useOrders.ts
│   │   └── useSales.ts
│   ├── 📁 pages/                 # Main application pages
│   │   ├── Index.tsx             # Landing page
│   │   ├── Login.tsx             # Login page
│   │   ├── POS.tsx               # Point-of-sale interface
│   │   ├── Register.tsx          # Registration page
│   │   └── Sales.tsx             # Sales dashboard
│   ├── 📁 services/              # API service layer
│   │   └── api.ts
│   ├── 📁 stores/                # State management
│   │   ├── authStore.ts
│   │   └── orderStore.ts
│   ├── 📁 types/                 # TypeScript definitions
│   │   └── index.ts
│   └── 📁 utils/                 # Utility functions
│       ├── currency.ts
│       ├── toast.ts
│       └── validation.ts
│
├── 📄 package.json               # Frontend dependencies
├── 📄 tailwind.config.ts         # Tailwind CSS configuration
├── 📄 vite.config.ts             # Vite build configuration
└── 📄 README.md                  # This file
```

---

## 🔧 Detailed Setup Instructions

### 1. Environment Configuration

#### Backend Environment (`.env`)

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/enzi_coffee_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRE="7d"

# Server Configuration
PORT=5000
NODE_ENV="development"

# CORS Configuration
FRONTEND_URL="http://localhost:5173"
```

### 2. Database Setup

```bash
# Navigate to backend directory
cd backend

# Install Prisma CLI globally (optional)
npm install -g prisma

# Generate Prisma client
npm run db:generate

# Create and apply database migrations
npm run db:migrate

# Push schema to database (for development)
npm run db:push

# Seed database with initial data
npm run db:seed
```

### 3. Development Workflow

```bash
# Start backend development server
cd backend
npm run dev          # Starts on http://localhost:5000

# Start frontend development server (new terminal)
npm run dev          # Starts on http://localhost:5173

# Run tests
npm run test         # Backend tests
npm run test:watch   # Watch mode

# Build for production
npm run build        # Backend build
npm run build        # Frontend build
```

---

## 📱 Usage Guide

### 🔐 Getting Started

1. **Access the Application**

   - Open your browser and navigate to `http://localhost:5173`
   - You'll see the beautiful landing page showcasing Enzi's features

2. **Create an Account**

   - Click "Start Your Journey" or "Get Started Today"
   - Fill in your details: name, email, and password
   - Your account will be created and you'll be logged in automatically

3. **Explore the Dashboard**
   - After login, you'll be redirected to the POS interface
   - The header shows navigation between POS and Sales sections

### ☕ Processing Orders

1. **Browse the Menu**

   - The left side shows the coffee menu with 4 available items
   - Each item displays the name and price clearly
   - Click the "+" button to add items to the current order

2. **Manage Current Order**

   - The right side shows your current order
   - Adjust quantities with "+" and "-" buttons
   - Remove items using the "×" button
   - See real-time total calculation

3. **Complete the Order**
   - Click "Complete Order" to review your order
   - Confirm the order details in the modal
   - Click "Confirm Order" to process the payment
   - View the success confirmation and order details

### 📊 Sales Analytics

1. **Access Sales Dashboard**

   - Click "Sales" in the header navigation
   - View your daily sales summary and metrics

2. **Review Order History**

   - See all completed orders with timestamps
   - Filter orders by date range
   - View detailed receipts for any order

3. **Analyze Performance**
   - Monitor total revenue and order counts
   - Track average order values
   - Identify top-selling items

---

## 🔗 API Documentation

### Authentication Endpoints

| Method | Endpoint             | Description       | Request Body                |
| ------ | -------------------- | ----------------- | --------------------------- |
| `POST` | `/api/auth/register` | Register new user | `{ name, email, password }` |
| `POST` | `/api/auth/login`    | Login user        | `{ email, password }`       |
| `POST` | `/api/auth/logout`   | Logout user       | None                        |
| `GET`  | `/api/auth/me`       | Get current user  | None                        |
| `GET`  | `/api/auth/check`    | Check auth status | None                        |

### Menu Endpoints

| Method | Endpoint        | Description            | Auth Required |
| ------ | --------------- | ---------------------- | ------------- |
| `GET`  | `/api/menu`     | Get all menu items     | ✅            |
| `GET`  | `/api/menu/:id` | Get specific menu item | ✅            |

### Order Endpoints

| Method | Endpoint          | Description        | Request Body                        | Auth Required |
| ------ | ----------------- | ------------------ | ----------------------------------- | ------------- |
| `POST` | `/api/orders`     | Create new order   | `{ items, totalAmount, itemCount }` | ✅            |
| `GET`  | `/api/orders`     | Get user's orders  | Query: `page`, `limit`              | ✅            |
| `GET`  | `/api/orders/:id` | Get specific order | None                                | ✅            |

### Sales Endpoints

| Method | Endpoint               | Description              | Auth Required |
| ------ | ---------------------- | ------------------------ | ------------- |
| `GET`  | `/api/sales/daily`     | Get daily sales summary  | ✅            |
| `GET`  | `/api/sales/user`      | Get current user's sales | ✅            |
| `GET`  | `/api/sales/analytics` | Get sales analytics      | ✅            |
| `GET`  | `/api/sales/top-items` | Get top selling items    | ✅            |

### Response Format

All API responses follow this structure:

```typescript
interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
```

### Example API Calls

```javascript
// Register a new user
const response = await fetch("/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    password: "securepassword123",
  }),
});

// Create a new order
const orderResponse = await fetch("/api/orders", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include", // Important for JWT cookies
  body: JSON.stringify({
    items: [
      { id: 1, name: "Espresso", price: 2500, quantity: 2 },
      { id: 2, name: "Latte", price: 3500, quantity: 1 },
    ],
    totalAmount: 8500,
    itemCount: 3,
  }),
});
```

---

## 🏢 Database Schema

### Users Table

```sql
CREATE TABLE users (
  id VARCHAR PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Orders Table

```sql
CREATE TABLE orders (
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR REFERENCES users(id),
  total_amount INTEGER NOT NULL, -- Amount in cents
  item_count INTEGER NOT NULL,
  items JSONB NOT NULL, -- Array of order items
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Menu Items (Static Data)

```json
[
  { "id": 1, "name": "Espresso", "price": 2500 },
  { "id": 2, "name": "Latte", "price": 3500 },
  { "id": 3, "name": "Cappuccino", "price": 3000 },
  { "id": 4, "name": "Mocha", "price": 4000 }
]
```

### Relationships

- Each **Order** belongs to one **User**
- Each **User** can have many **Orders**
- **Menu Items** are stored as static data (no database table)

---

## 🔐 Security Features

### 🛡️ Authentication & Authorization

- **JWT Tokens**: Secure token-based authentication
- **HTTP-Only Cookies**: Tokens stored securely in cookies
- **Password Hashing**: bcryptjs with salt rounds for password security
- **Protected Routes**: Middleware-based route protection

### 🔒 API Security

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configured for frontend origin only
- **Helmet Security**: Security headers and protection
- **Input Validation**: Zod schema validation for all inputs

### 🚫 Data Protection

- **SQL Injection Prevention**: Prisma ORM with parameterized queries
- **XSS Protection**: Input sanitization and validation
- **CSRF Protection**: SameSite cookie configuration
- **Environment Variables**: Sensitive data in environment files

---

## 🎨 UI/UX Design

### Design Philosophy

Enzi Barista Station follows a **minimalistic, coffee-inspired design** with a focus on:

- **Simplicity**: Clean, uncluttered interface for fast operations
- **Accessibility**: WCAG compliant components with proper contrast
- **Responsiveness**: Mobile-first design that works on all devices
- **Coffee Theme**: Warm browns and creams reflecting coffee culture

### Color Palette

```css
/* Primary Colors */
--coffee: #3B2620          /* Deep coffee brown */
--coffee-light: #E5D5C7    /* Light cream */
--coffee-medium: #6B4226   /* Medium roast */
--coffee-warm: #A67C5A     /* Warm latte */

/* Neutral Colors */
--background: #FAFAFA      /* Off-white background */
--foreground: #141414      /* Near-black text */
--muted: #F4F4F5          /* Light gray */
```

### Typography

- **Primary Font**: System font stack for optimal performance
- **Font Sizes**: Tailwind's type scale (text-sm to text-7xl)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Component Library

Built on **shadcn/ui** with custom coffee shop theming:

- **Buttons**: Multiple variants with coffee-inspired colors
- **Cards**: Subtle shadows with rounded corners
- **Forms**: Clean inputs with proper validation states
- **Modals**: Centered dialogs with backdrop blur
- **Navigation**: Clear hierarchy and active states

---

## 🧪 Testing

### Backend Testing

```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Test Coverage Areas

- **Authentication**: Login, logout, registration flows
- **API Endpoints**: All CRUD operations with validation
- **Middleware**: Auth, error handling, rate limiting
- **Database**: Prisma operations and data integrity
- **Security**: Input validation and sanitization

### Testing Tools

- **Jest**: Test framework and assertion library
- **Supertest**: HTTP integration testing
- **@types/jest**: TypeScript support for Jest

---

## 🚀 Deployment

### Production Build

1. **Backend Build**

   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Frontend Build**
   ```bash
   npm run build
   npm run preview  # Preview production build
   ```

### Environment Setup

#### Production Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/production_db"

# Security
JWT_SECRET="your-production-jwt-secret-256-bit"
NODE_ENV="production"

# Server
PORT=5000
FRONTEND_URL="https://your-domain.com"
```

### Deployment Options

#### Option 1: Traditional VPS/Server

1. Set up PostgreSQL database
2. Clone repository and install dependencies
3. Set environment variables
4. Run database migrations
5. Build and start both frontend and backend
6. Configure reverse proxy (nginx/Apache)

#### Option 2: Docker Deployment

```dockerfile
# Example Dockerfile for backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

#### Option 3: Cloud Platforms

- **Vercel**: Frontend deployment
- **Railway/Heroku**: Backend deployment
- **PlanetScale**: Database hosting
- **Cloudflare**: CDN and domain management

---

## 🤝 Contributing

We welcome contributions to make Enzi Barista Station even better! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Contribution Guidelines

- **Code Style**: Follow TypeScript and ESLint conventions
- **Testing**: Add tests for new features
- **Documentation**: Update README for significant changes
- **Commits**: Use clear, descriptive commit messages
- **Issues**: Check existing issues before creating new ones

### Areas for Contribution

- 🐛 **Bug Fixes**: Fix issues and improve stability
- ✨ **New Features**: Add new POS functionality
- 📚 **Documentation**: Improve guides and examples
- 🎨 **UI/UX**: Enhance design and user experience
- ⚡ **Performance**: Optimize speed and efficiency
- 🔒 **Security**: Strengthen security measures

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Enzi Coffee Shop

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

### 🙏 Thank You for Choosing Enzi Barista Station!

_Built with ❤️ for coffee enthusiasts and shop owners worldwide_

**[⬆ Back to Top](#-enzi-barista-station)**

---

**Questions or Need Help?**

📧 Email: support@enzi-coffee.com  
💬 Discord: [Join our community](https://discord.gg/enzi-coffee)  
🐛 Issues: [GitHub Issues](https://github.com/yourusername/enzi-barista-station/issues)

</div>
