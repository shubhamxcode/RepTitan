# Render Environment Variables Setup

## Required Environment Variables for Render

Go to **Render Dashboard** → Your Web Service → **Environment** and add these:

### Essential Variables:

```env
# Database (from Render PostgreSQL service)
DATABASE_URL=postgresql://user:password@host:port/database

# Server Port (Render uses 10000 by default)
PORT=10000

# Environment
NODE_ENV=production

# Session Secret (generate with: openssl rand -base64 32)
SESSION_SECRET=your-generated-secret-here

# ⚠️ CRITICAL: Your Vercel Frontend URL (no trailing slash!)
CORS_ORIGIN=https://your-app.vercel.app
```

### Optional but Recommended:

```env
# Your Render Backend URL (helps with OAuth callbacks)
BACKEND_URL=https://your-api.onrender.com
```

### Google OAuth (if using):

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## ⚠️ Important Notes:

1. **CORS_ORIGIN** must be:
   - Your **Vercel frontend URL** (e.g., `https://reptitan.vercel.app`)
   - Use `https://` (not `http://`)
   - **NO trailing slash** at the end
   - This is what fixes the redirect to localhost issue!

2. **BACKEND_URL** should be:
   - Your Render service URL (e.g., `https://reptitan-api.onrender.com`)
   - Helps OAuth callbacks work correctly

3. **DATABASE_URL**:
   - Get this from Render PostgreSQL service → **Internal Database URL**
   - Or use the **Connection Pooling URL** for better performance

## Example Configuration:

```env
DATABASE_URL=postgresql://reptitan_user:password@dpg-xxxxx-a.oregon-postgres.render.com/reptitan_db
PORT=10000
NODE_ENV=production
SESSION_SECRET=abc123xyz789generatedsecret
CORS_ORIGIN=https://reptitan.vercel.app
BACKEND_URL=https://reptitan-api.onrender.com
GOOGLE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123xyz
```

## How to Fix the localhost:3001 Redirect Issue:

1. **Check CORS_ORIGIN in Render:**
   - Go to Render Dashboard → Your Service → **Environment**
   - Make sure `CORS_ORIGIN` is set to your **Vercel URL**
   - Should look like: `https://your-app.vercel.app` (no trailing slash!)

2. **If CORS_ORIGIN is missing or wrong:**
   - Add/Update: `CORS_ORIGIN=https://your-actual-vercel-url.vercel.app`
   - Render will auto-redeploy

3. **Verify:**
   - After redeploy, test OAuth login
   - Should redirect to your Vercel URL, not localhost

## Quick Checklist:

- [ ] `CORS_ORIGIN` = Your Vercel frontend URL (https://...)
- [ ] `CORS_ORIGIN` has no trailing slash
- [ ] `DATABASE_URL` is set correctly
- [ ] `SESSION_SECRET` is a strong random string
- [ ] `BACKEND_URL` = Your Render backend URL (optional but recommended)
- [ ] All variables saved and service redeployed

