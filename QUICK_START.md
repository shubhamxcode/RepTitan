# Quick Start Guide - Google Authentication

## Prerequisites
- Docker Desktop must be running
- Node.js and npm/pnpm installed

## Step-by-Step Instructions

### 1. Start Docker Desktop
Make sure Docker Desktop is running on your machine.

### 2. Start the Database
```bash
cd RepTitan/apps/server
npm run db:start
```

### 3. Update Database Schema
```bash
npm run db:push
```

### 4. Start the Backend Server
```bash
npm run dev
```
The server will run on http://localhost:3000

### 5. Start the Frontend (in a new terminal)
```bash
cd RepTitan/apps/web
npm run dev
```
The frontend will run on http://localhost:3001

### 6. Configure Google Cloud Console
Make sure your Google OAuth 2.0 credentials are configured with:
- **Authorized JavaScript origins**: `http://localhost:3001`
- **Authorized redirect URIs**: `http://localhost:3000/auth/google/callback`

### 7. Test Google Authentication
1. Open http://localhost:3001/auth/Login in your browser
2. Click "Continue with Google"
3. Sign in with your Google account
4. You'll be redirected back to the app
5. Check your database to see the user was created!

## Verify User in Database
```bash
cd RepTitan/apps/server
npm run db:studio
```
This opens Prisma Studio where you can view your users.

## Environment Variables
All necessary environment variables are already configured in `RepTitan/apps/server/.env`:
- ✅ DATABASE_URL
- ✅ PORT
- ✅ CORS_ORIGIN (updated to port 3001)
- ✅ GOOGLE_CLIENT_ID
- ✅ GOOGLE_CLIENT_SECRET
- ✅ SESSION_SECRET

## Troubleshooting

### Database connection error
- Ensure Docker is running
- Run `npm run db:start` in the server directory

### CORS errors
- Verify CORS_ORIGIN in .env matches your frontend URL (http://localhost:3001)
- Ensure credentials: true is set in both frontend and backend

### Google OAuth errors
- Check Google Cloud Console redirect URI configuration
- Ensure client ID and secret are correct in .env
- Verify callback URL is `http://localhost:3000/auth/google/callback`

## What's Next?
See [GOOGLE_AUTH_SETUP.md](./GOOGLE_AUTH_SETUP.md) for detailed documentation on:
- How the authentication flow works
- Using the `useAuth` hook in your components
- Security considerations
- Production deployment notes
