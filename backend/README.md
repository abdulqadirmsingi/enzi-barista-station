# Enzi Coffee Shop - Backend API

A Node.js/Express.js backend API for the Enzi Coffee Shop POS system.

## 🏗️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with HTTP-only cookies
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting
- **Password Hashing**: bcryptjs

## 🚀 Features

- **Authentication System**: Register, login, logout with JWT cookies
- **Menu Management**: Static coffee menu with validation
- **Order Management**: Create, view, and track orders
- **Sales Analytics**: Daily sales, user sales, top-selling items
- **Security**: Rate limiting, CORS, input validation
- **Error Handling**: Centralized error handling with custom error classes

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/         # Route handlers
│   │   ├── auth.controller.ts
│   │   ├── menu.controller.ts
│   │   ├── order.controller.ts
│   │   └── sales.controller.ts
│   ├── middleware/          # Custom middleware
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── routes/              # API routes
│   │   ├── auth.routes.ts
│   │   ├── menu.routes.ts
│   │   ├── order.routes.ts
│   │   └── sales.routes.ts
│   ├── utils/               # Utility functions
│   │   ├── database.ts
│   │   ├── jwt.ts
│   │   ├── menu.ts
│   │   └── password.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   └── server.ts           # Application entry point
├── prisma/                 # Database schema and migrations
│   └── schema.prisma
├── package.json
├── tsconfig.json
└── .env.example
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd enzi-barista-station/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/enzi_coffee_shop?schema=public"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   JWT_EXPIRES_IN="7d"
   PORT=5000
   NODE_ENV="development"
   FRONTEND_URL="http://localhost:3000"
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push

   # Or run migrations (if using migrations)
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## 📋 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 🔗 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/check` - Check authentication status

### Menu

- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get specific menu item

### Orders

- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders (with pagination)
- `GET /api/orders/:id` - Get specific order

### Sales

- `GET /api/sales/daily` - Get daily sales summary
- `GET /api/sales/user` - Get current user's sales
- `GET /api/sales/analytics` - Get sales analytics
- `GET /api/sales/top-items` - Get top selling items

## 🏢 Database Schema

### Users Table

```sql
- id (String, Primary Key, CUID)
- email (String, Unique)
- password (String, Hashed)
- name (String)
- created_at (DateTime)
- updated_at (DateTime)
```

### Orders Table

```sql
- id (String, Primary Key, CUID)
- user_id (String, Foreign Key)
- total_amount (Int) // Amount in cents
- item_count (Int)
- items (JSON) // Array of order items
- created_at (DateTime)
- updated_at (DateTime)
```

### Menu Items (Static)

```json
[
  { "id": 1, "name": "Espresso", "price": 2500 },
  { "id": 2, "name": "Latte", "price": 3500 },
  { "id": 3, "name": "Cappuccino", "price": 3000 },
  { "id": 4, "name": "Mocha", "price": 4000 }
]
```

## 🔐 Authentication

The API uses JWT tokens stored in HTTP-only cookies for authentication. This provides better security compared to storing tokens in localStorage.

### Cookie Configuration

- **Name**: `auth-token`
- **HttpOnly**: `true`
- **Secure**: `true` (in production)
- **SameSite**: `none` (in production), `lax` (in development)
- **MaxAge**: 7 days

## 🛡️ Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for frontend domain
- **Helmet**: Security headers
- **Input Validation**: Zod schema validation
- **Password Hashing**: bcryptjs with 12 salt rounds
- **JWT Security**: HTTP-only cookies with expiration

## 📊 Order Workflow

1. **Menu Display**: Static menu items served from memory
2. **Order Creation**: Validate items, calculate totals, save to database
3. **Order Tracking**: Users can view their order history
4. **Sales Analytics**: Real-time sales data and analytics

## 🧪 Testing

The backend includes comprehensive error handling and validation:

- **Input Validation**: All API endpoints validate input using Zod schemas
- **Authentication Middleware**: Protected routes require valid JWT tokens
- **Error Handling**: Centralized error handling with descriptive messages
- **Database Validation**: Prisma schema validation

## 📦 Dependencies

### Production Dependencies

- `express` - Web framework
- `@prisma/client` - Database ORM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens
- `zod` - Schema validation
- `cors` - CORS middleware
- `helmet` - Security headers
- `cookie-parser` - Cookie parsing
- `express-rate-limit` - Rate limiting
- `morgan` - HTTP request logger
- `dotenv` - Environment variables

### Development Dependencies

- `typescript` - TypeScript support
- `@types/*` - TypeScript type definitions
- `prisma` - Database toolkit
- `nodemon` - Development server
- `tsx` - TypeScript execution
- `jest` - Testing framework
- `eslint` - Code linting

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE_URL=<production-database-url>
JWT_SECRET=<strong-secret-key>
FRONTEND_URL=<frontend-domain>
PORT=5000
```

### Build and Deploy

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Follow TypeScript best practices
2. Use ESLint and Prettier for code formatting
3. Write descriptive commit messages
4. Add proper error handling and validation
5. Update documentation for new features

## 📝 License

MIT License - see LICENSE file for details.
