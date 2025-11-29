# Deployment Guide: Render + Vercel

This guide will help you deploy RepTitan with the backend on Render and the frontend on Vercel.

## Architecture Overview

- **Backend (Render)**: Node.js/Express server with Prisma and PostgreSQL
- **Frontend (Vercel)**: React application with TanStack Router
- **Database**: PostgreSQL (Render PostgreSQL or external)

## Prerequisites

1. GitHub repository with your code
2. Render account (https://render.com)
3. Vercel account (https://vercel.com)
4. Google Cloud Console account (for OAuth - optional)
5. Google AI Studio account (for Gemini API - optional)

---

## Part 1: Deploy Backend on Render

### Step 1: Create PostgreSQL Database (if not using external)

1. Go to Render Dashboard → **New +** → **PostgreSQL**
2. Configure:
   - **Name**: `reptitan-db`
   - **Database**: `reptitan`
   - **User**: (auto-generated)
   - **Region**: Choose closest to your users
3. Click **Create Database**
4. Copy the **Internal Database URL** (you'll use this later)

### Step 2: Create Web Service

1. Go to Render Dashboard → **New +** → **Web Service**
2. Connect your GitHub repository
3. Configure the service:

   **Basic Settings:**
   - **Name**: `reptitan-api` (or your preferred name)
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `apps/server`
   - **Runtime**: `Node`
   - **Build Command**: 
     ```bash
     cd ../.. && pnpm install --frozen-lockfile && cd apps/server && pnpm db:generate && pnpm build
     ```
   - **Start Command**: `pnpm start`

   **Environment Variables:**
   Add the following environment variables:

   ```env
   DATABASE_URL=<Your PostgreSQL connection string from Step 1>
   NODE_ENV=production
   PORT=10000
   SESSION_SECRET=<Generate a strong random string: openssl rand -base64 32>
   CORS_ORIGIN=https://your-app.vercel.app
   GOOGLE_CLIENT_ID=<Your Google OAuth Client ID>
   GOOGLE_CLIENT_SECRET=<Your Google OAuth Client Secret>
   ```

   **Important Notes:**
   - Render uses port `10000` by default, but your app reads from `PORT` env var
   - `CORS_ORIGIN` should be your Vercel URL (you'll update this after deploying frontend)
   - Generate `SESSION_SECRET` using: `openssl rand -base64 32`

4. Click **Create Web Service**

### Step 3: Get Backend URL

After deployment, Render will provide a URL like:
- `https://reptitan-api.onrender.com`

**Copy this URL** - you'll need it for the frontend configuration.

---

## Part 2: Deploy Frontend on Vercel

### Step 1: Import Project

1. Go to Vercel Dashboard → **Add New** → **Project**
2. Import your GitHub repository
3. Configure the project:

   **Framework Preset:** 
   - Select **Vite** (or **Other** if Vite not available)

   **Root Directory:**
   - Set to `apps/web`

   **Build Command:**
   - `pnpm build` (or `npm run build`)

   **Output Directory:**
   - `dist`

   **Install Command:**
   - `pnpm install` (or `npm install`)

### Step 2: Configure Environment Variables

In Vercel project settings → **Environment Variables**, add:

```env
VITE_API_URL=https://reptitan-api.onrender.com
VITE_GEMINI_API_KEY=your-gemini-api-key
```

**Important:**
- Replace `https://reptitan-api.onrender.com` with your actual Render backend URL
- `VITE_GEMINI_API_KEY` is optional (only needed for chatbot feature)

### Step 3: Deploy

1. Click **Deploy**
2. Wait for deployment to complete
3. Copy your Vercel deployment URL (e.g., `https://reptitan.vercel.app`)

---

## Part 3: Connect Backend and Frontend

### Step 1: Update Backend CORS

1. Go back to Render Dashboard → Your Web Service → **Environment**
2. Update `CORS_ORIGIN` to your Vercel URL:
   ```env
   CORS_ORIGIN=https://reptitan.vercel.app
   ```
3. Render will automatically redeploy

### Step 2: Update Google OAuth Redirect URIs

If you're using Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add authorized redirect URIs:
   - `https://reptitan-api.onrender.com/auth/google/callback`
   - `http://localhost:3000/auth/google/callback` (for local dev)

### Step 3: Verify Connection

1. Visit your Vercel frontend URL
2. Open browser DevTools → Network tab
3. Try logging in or making an API call
4. Check that requests go to your Render backend URL
5. Verify CORS headers are correct (no CORS errors)

---

## Part 4: Database Setup

### Run Prisma Migrations

After your backend is deployed, you need to set up the database schema:

**Option 1: Using Render Shell**
1. Go to Render Dashboard → Your Web Service → **Shell**
2. Run:
   ```bash
   cd apps/server
   pnpm db:push
   ```

**Option 2: Using Local Machine**
1. Set `DATABASE_URL` in your local `.env` to your Render database URL
2. Run:
   ```bash
   cd apps/server
   pnpm db:push
   ```

---

## Environment Variables Summary

### Backend (Render) - Required:
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV=production`
- `PORT=10000` (Render default)
- `SESSION_SECRET` - Strong random string
- `CORS_ORIGIN` - Your Vercel frontend URL

### Backend (Render) - Optional:
- `GOOGLE_CLIENT_ID` - For Google OAuth
- `GOOGLE_CLIENT_SECRET` - For Google OAuth

### Frontend (Vercel) - Required:
- `VITE_API_URL` - Your Render backend URL

### Frontend (Vercel) - Optional:
- `VITE_GEMINI_API_KEY` - For AI chatbot feature

---

## Troubleshooting

### CORS Errors
- Verify `CORS_ORIGIN` in Render matches your Vercel URL exactly
- Check that backend is sending correct CORS headers
- Ensure credentials are included in fetch requests

### Database Connection Issues
- Verify `DATABASE_URL` is correct in Render environment variables
- Check that database is accessible from Render (use Internal Database URL)
- Ensure Prisma client is generated (`pnpm db:generate`)

### Build Failures
- Check that all dependencies are in `package.json`
- Verify build commands are correct
- Check Render build logs for specific errors

### API Calls Failing
- Verify `VITE_API_URL` in Vercel matches your Render URL
- Check browser console for network errors
- Verify backend is running (check Render logs)

---

## Local Development Setup

For local development, create `.env` files:

**`apps/server/.env`:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/reptitan"
PORT=3000
NODE_ENV=development
SESSION_SECRET="local-dev-secret"
CORS_ORIGIN="http://localhost:3001"
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

**`apps/web/.env`:**
```env
VITE_API_URL="http://localhost:3000"
VITE_GEMINI_API_KEY="your-api-key"
```

---

## Quick Reference

### Render Backend URL Format
```
https://<service-name>.onrender.com
```

### Vercel Frontend URL Format
```
https://<project-name>.vercel.app
```

### Update CORS After Frontend Deployment
1. Get Vercel URL
2. Update `CORS_ORIGIN` in Render environment variables
3. Wait for automatic redeploy

---

## Next Steps

1. ✅ Deploy backend on Render
2. ✅ Deploy frontend on Vercel
3. ✅ Update CORS_ORIGIN in Render
4. ✅ Run database migrations
5. ✅ Test authentication flow
6. ✅ Test API endpoints
7. ✅ Set up custom domains (optional)

---

## Support

If you encounter issues:
1. Check Render logs: Dashboard → Your Service → **Logs**
2. Check Vercel logs: Dashboard → Your Project → **Deployments** → Click deployment → **View Function Logs**
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly

