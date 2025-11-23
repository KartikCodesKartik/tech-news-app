# Quick Start Guide

This guide will help you get the Tech News App running in under 5 minutes.

## Prerequisites

Make sure you have these installed:
- Node.js (v14+)
- MongoDB (running locally or cloud connection string)
- Git

## Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/KartikCodesKartik/tech-news-app.git
cd tech-news-app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 2: Configure Environment Variables

### Backend (.env file in backend folder):
```bash
cd ../backend
cp .env.example .env
```

Edit `.env` and update these required values:
```
MONGODB_URI=mongodb://localhost:27017/tech-news-app
JWT_SECRET=your_random_secret_key_here
BREVO_SMTP_USER=your_brevo_username
BREVO_SMTP_PASSWORD=your_brevo_password
```

### Frontend (.env file in frontend folder):
```bash
cd ../frontend
cp .env.example .env
```

The default values should work:
```
VITE_API_URL=http://localhost:5000/api
```

## Step 3: Create First Admin User

```bash
cd ../backend
node createAdmin.js
```

This creates an admin account with:
- Email: admin@technews.com
- Password: admin123

**Important**: Change this password after first login!

## Step 4: Start the Application

Open two terminal windows:

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:3000

## Step 5: Access the Application

1. Open browser to http://localhost:3000
2. Click "Login"
3. Use credentials:
   - Email: admin@technews.com
   - Password: admin123
4. Change password immediately!

## What's Next?

Now you can:
- Create editor accounts from Admin panel
- Write and publish articles
- Manage newsletter subscribers
- View article analytics

## Common Issues

### MongoDB Connection Error
- Make sure MongoDB is running: `mongod` or check your cloud connection string
- Verify MONGODB_URI in backend/.env

### Port Already in Use
- Backend: Change PORT in backend/.env
- Frontend: It will prompt you to use a different port

### Email Not Working
- Get free Brevo account at https://www.brevo.com
- Update BREVO credentials in backend/.env
- Email features are optional for testing

## Need Help?

See the main README.md for detailed documentation.
