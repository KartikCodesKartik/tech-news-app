# Tech News App

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing and publishing tech news articles with role-based access control, newsletter system, and analytics.

## Features

### Admin Panel
- **Authentication System**: JWT-based authentication with login, register, and password reset functionality
- **Role-Based Access Control**: 
  - Main Admin: Full access to all features
  - Editor: Can create, edit, and manage their own articles
- **Editor Management**: Main admin can create, view, deactivate, and delete editor accounts
- **Article Management**: 
  - Create, read, update, and delete articles
  - Draft and publish functionality
  - Rich content management
  - Category and tag system
  - Image support
- **Analytics Dashboard**:
  - View count tracking for each article
  - Author-wise statistics
  - Total views, published articles, and drafts

### Public Features
- Browse published tech news articles
- View individual articles (with automatic view tracking)
- Newsletter subscription/unsubscription
- Responsive design

### Email System
- Powered by Brevo SMTP (Sendinblue)
- Welcome emails for new users
- Password reset emails
- Newsletter emails when articles are published

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Nodemailer** with Brevo SMTP for email services
- **express-validator** for input validation

### Frontend
- **React** with Vite
- **React Router** for navigation
- **Axios** for API calls
- **Context API** for state management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Brevo SMTP account (for email functionality)

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/KartikCodesKartik/tech-news-app.git
cd tech-news-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/tech-news-app

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Brevo SMTP (Sendinblue)
BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=your_brevo_smtp_user
BREVO_SMTP_PASSWORD=your_brevo_smtp_password
BREVO_FROM_EMAIL=noreply@technews.com
BREVO_FROM_NAME=Tech News App

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Start MongoDB
Make sure MongoDB is running on your system.

### Start Backend Server
```bash
cd backend
npm run dev
# or for production
npm start
```
The backend will run on http://localhost:5000

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will run on http://localhost:3000

## Creating the First Admin User

Since registration requires authentication, you'll need to create the first admin user directly in MongoDB:

```javascript
// Connect to MongoDB and run this in MongoDB shell or Compass
use tech-news-app

db.users.insertOne({
  name: "Admin User",
  email: "admin@technews.com",
  password: "$2a$10$xyz...", // Use bcrypt to hash a password
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or use this Node.js script (create a file `createAdmin.js` in backend folder):

```javascript
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

mongoose.connect(process.env.MONGODB_URI);

async function createAdmin() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);
  
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@technews.com',
    password: hashedPassword,
    role: 'admin',
    isActive: true
  });
  
  console.log('Admin created:', admin);
  process.exit(0);
}

createAdmin();
```

Run with: `node createAdmin.js`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user (Admin only)
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/editors` - Get all editors
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Articles
- `GET /api/articles` - Get all articles (public)
- `GET /api/articles/:id` - Get single article (public)
- `POST /api/articles` - Create article (Auth required)
- `PUT /api/articles/:id` - Update article (Auth required)
- `DELETE /api/articles/:id` - Delete article (Auth required)
- `GET /api/articles/stats/views` - Get article statistics (Admin only)

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter (public)
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter (public)
- `GET /api/newsletter/subscribers` - Get all subscribers (Admin only)

## Project Structure

```
tech-news-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── articleController.js
│   │   │   └── newsletterController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Article.js
│   │   │   └── Newsletter.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── articleRoutes.js
│   │   │   └── newsletterRoutes.js
│   │   ├── utils/
│   │   │   └── emailService.js
│   │   └── server.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   └── Layout/
│   │   │       ├── Layout.jsx
│   │   │       └── Layout.css
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── ArticleList.jsx
│   │   │   │   ├── ArticleForm.jsx
│   │   │   │   ├── EditorManagement.jsx
│   │   │   │   ├── ArticleStats.jsx
│   │   │   │   └── Admin.css
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   ├── ResetPassword.jsx
│   │   │   │   └── Auth.css
│   │   │   └── Public/
│   │   │       ├── Home.jsx
│   │   │       ├── ArticleView.jsx
│   │   │       └── Public.css
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── index.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
└── README.md
```

## User Roles

### Main Admin
- Create and manage editor accounts
- View all articles and editors
- Access analytics dashboard
- Full CRUD operations on all articles
- Manage newsletter subscribers

### Editor
- Create and publish articles
- Edit and delete their own articles
- View their own article statistics
- Basic dashboard access

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes with role-based authorization
- Input validation and sanitization
- Secure password reset with time-limited tokens
- HTTP-only cookies support

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Uses Vite's HMR
```

## Production Build

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serve the dist folder with a static file server
```

## Environment Variables

See `.env.example` files in both `backend` and `frontend` directories for all required environment variables.

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For support, email support@technews.com or open an issue in the repository.