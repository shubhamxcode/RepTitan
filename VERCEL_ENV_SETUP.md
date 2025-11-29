# Vercel Environment Variables Setup

## Required Environment Variables for Vercel

Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables** and add these:

### Essential Variable (Required):

```env
VITE_API_URL=https://your-api.onrender.com
```

**Important:**
- Replace `your-api.onrender.com` with your **actual Render backend URL**
- Use `https://` (not `http://`)
- No trailing slash at the end
- This connects your frontend to the backend API

### Optional Variable (For AI Chatbot):

```env
VITE_GEMINI_API_KEY=your-gemini-api-key
```

**Note:** Only needed if you're using the AI chatbot feature. Get your key from: https://makersuite.google.com/app/apikey

## Example Configuration:

```env
VITE_API_URL=https://reptitan-api.onrender.com
VITE_GEMINI_API_KEY=AIzaSyAbc123xyz789
```

## Step-by-Step Setup in Vercel:

1. **Go to Vercel Dashboard**
   - Navigate to your project

2. **Open Settings**
   - Click on **Settings** tab
   - Click on **Environment Variables** in the sidebar

3. **Add VITE_API_URL**
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-render-backend-url.onrender.com`
   - **Environment:** Select all (Production, Preview, Development)
   - Click **Save**

4. **Add VITE_GEMINI_API_KEY (Optional)**
   - **Key:** `VITE_GEMINI_API_KEY`
   - **Value:** Your Gemini API key
   - **Environment:** Select all (Production, Preview, Development)
   - Click **Save**

5. **Redeploy**
   - After adding variables, go to **Deployments**
   - Click the **3 dots** (⋯) on the latest deployment
   - Click **Redeploy**
   - Or push a new commit to trigger auto-deploy

## How to Find Your Render Backend URL:

1. Go to **Render Dashboard**
2. Click on your **Web Service** (backend)
3. Your URL will be at the top, like: `https://reptitan-api.onrender.com`
4. Copy this URL and use it for `VITE_API_URL`

## Verification:

After setting up environment variables:

1. **Check Vercel Deployment Logs:**
   - Go to **Deployments** → Click on a deployment
   - Check **Build Logs** to ensure variables are loaded

2. **Test in Browser:**
   - Open your Vercel app
   - Open **DevTools** → **Console**
   - Check Network tab - API calls should go to your Render backend
   - No CORS errors should appear

3. **Test API Connection:**
   - Try logging in or making an API call
   - Should connect to your Render backend successfully

## Quick Checklist:

- [ ] `VITE_API_URL` = Your Render backend URL (https://...)
- [ ] `VITE_API_URL` has no trailing slash
- [ ] `VITE_GEMINI_API_KEY` added (if using chatbot)
- [ ] Variables set for all environments (Production, Preview, Development)
- [ ] Project redeployed after adding variables

## Common Issues:

### ❌ API calls going to localhost:3000
**Fix:** Make sure `VITE_API_URL` is set correctly in Vercel

### ❌ CORS errors
**Fix:** Check that `CORS_ORIGIN` in Render matches your Vercel URL

### ❌ Environment variables not working
**Fix:** 
- Variables must start with `VITE_` to be exposed to frontend
- Redeploy after adding variables
- Check build logs for errors

## Complete Setup Summary:

### Backend (Render):
```env
CORS_ORIGIN=https://your-app.vercel.app
DATABASE_URL=postgresql://...
PORT=10000
NODE_ENV=production
SESSION_SECRET=...
BACKEND_URL=https://your-api.onrender.com
```

### Frontend (Vercel):
```env
VITE_API_URL=https://your-api.onrender.com
VITE_GEMINI_API_KEY=... (optional)
```

## Connection Flow:

1. **User visits:** `https://your-app.vercel.app` (Vercel)
2. **Frontend makes API call:** Uses `VITE_API_URL` → `https://your-api.onrender.com`
3. **Backend receives request:** Checks `CORS_ORIGIN` → Allows `https://your-app.vercel.app`
4. **Response sent back:** Frontend receives data ✅

Both URLs must match:
- Frontend `VITE_API_URL` = Backend service URL
- Backend `CORS_ORIGIN` = Frontend Vercel URL

