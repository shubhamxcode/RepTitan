# Environment Variables Implementation Summary

## ✅ Changes Made

All code has been updated to use your specified environment variables:

### Frontend (Web) - Uses Render URL
- **Variable:** `VITE_RENDER_URL` (must start with `VITE_` for Vite to expose it)
- **Value:** `https://reptitan-cxw5.onrender.com`
- **Used for:** All API calls to backend, Google OAuth redirects

### Backend (Server) - Uses Vercel URL
- **Variables:** 
  - `CORS_ORIGIN` = `https://rep-titan-web-shj7.vercel.app`
  - `VERCEL_URL` = `https://rep-titan-web-shj7.vercel.app` (preferred for redirects)
- **Used for:** CORS configuration, OAuth redirects after authentication

### Backend (Server) - Uses Render URL for OAuth Callback
- **Variable:** `RENDER_URL` = `https://reptitan-cxw5.onrender.com`
- **Used for:** Google OAuth callback URL configuration

---

## 📋 Environment Variables Setup

### Vercel (Frontend) - Required:

```env
VITE_RENDER_URL=https://reptitan-cxw5.onrender.com
```

**Important:** 
- Must start with `VITE_` prefix (Vite requirement)
- Set in: Vercel Dashboard → Project → Settings → Environment Variables
- Apply to: Production, Preview, Development

### Render (Backend) - Required:

```env
# Vercel Frontend URL (for CORS and redirects)
CORS_ORIGIN=https://rep-titan-web-shj7.vercel.app
VERCEL_URL=https://rep-titan-web-shj7.vercel.app

# Render Backend URL (for OAuth callbacks)
RENDER_URL=https://reptitan-cxw5.onrender.com

# Other required variables
DATABASE_URL=postgresql://...
PORT=10000
NODE_ENV=production
SESSION_SECRET=...
```

---

## 🔄 What Was Updated

### Frontend (`apps/web/src/lib/api.ts`):
- ✅ Changed from `VITE_API_URL` to `VITE_RENDER_URL`
- ✅ All API calls now use your Render URL: `https://reptitan-cxw5.onrender.com`
- ✅ Google OAuth redirect uses Render URL

### Backend (`apps/server/src/config/passport.ts`):
- ✅ OAuth callback URL uses `RENDER_URL` environment variable
- ✅ Falls back to `RENDER_EXTERNAL_URL` if `RENDER_URL` not set

### Backend (`apps/server/src/routers/auth.ts`):
- ✅ Redirects use `VERCEL_URL` (preferred) or `CORS_ORIGIN`
- ✅ Both point to: `https://rep-titan-web-shj7.vercel.app`

### Backend (`apps/server/src/index.ts`):
- ✅ CORS uses `CORS_ORIGIN` which is your Vercel URL

---

## 🎯 API Call Flow

1. **Frontend makes API call:**
   ```
   Frontend (Vercel) → Uses VITE_RENDER_URL → https://reptitan-cxw5.onrender.com
   ```

2. **Backend receives request:**
   ```
   Backend (Render) → Checks CORS_ORIGIN → Allows https://rep-titan-web-shj7.vercel.app
   ```

3. **OAuth callback:**
   ```
   Google → RENDER_URL/auth/google/callback → https://reptitan-cxw5.onrender.com/auth/google/callback
   ```

4. **After OAuth success:**
   ```
   Backend → Redirects to VERCEL_URL/dashboard → https://rep-titan-web-shj7.vercel.app/dashboard
   ```

---

## ✅ Verification Checklist

### Vercel Environment Variables:
- [ ] `VITE_RENDER_URL` = `https://reptitan-cxw5.onrender.com`
- [ ] Variable starts with `VITE_` prefix
- [ ] Applied to all environments (Production, Preview, Development)
- [ ] Project redeployed after adding variable

### Render Environment Variables:
- [ ] `CORS_ORIGIN` = `https://rep-titan-web-shj7.vercel.app`
- [ ] `VERCEL_URL` = `https://rep-titan-web-shj7.vercel.app`
- [ ] `RENDER_URL` = `https://reptitan-cxw5.onrender.com`
- [ ] All other required variables set (DATABASE_URL, PORT, etc.)
- [ ] Service redeployed after changes

---

## 🚨 Important Notes

1. **Vite Environment Variables:**
   - In Vercel, you MUST set it as `VITE_RENDER_URL` (with `VITE_` prefix)
   - Vite only exposes environment variables that start with `VITE_`
   - If you set it as `RENDER_URL` without the prefix, it won't work

2. **OAuth Callback:**
   - Make sure Google Cloud Console has the redirect URI:
   - `https://reptitan-cxw5.onrender.com/auth/google/callback`

3. **CORS Configuration:**
   - `CORS_ORIGIN` in Render must exactly match your Vercel URL
   - No trailing slashes
   - Use `https://` (not `http://`)

---

## 🧪 Testing

After setting up environment variables:

1. **Test API Connection:**
   - Open your Vercel app
   - Open DevTools → Network tab
   - Make an API call (e.g., login)
   - Verify requests go to: `https://reptitan-cxw5.onrender.com`

2. **Test OAuth:**
   - Click "Continue with Google"
   - Should redirect to Google, then back to your Vercel app
   - Should NOT redirect to localhost

3. **Check Console:**
   - No CORS errors
   - No 404 errors for API endpoints
   - All requests successful

---

## 📝 Quick Reference

**Frontend (Vercel):**
- `VITE_RENDER_URL` → `https://reptitan-cxw5.onrender.com`

**Backend (Render):**
- `CORS_ORIGIN` → `https://rep-titan-web-shj7.vercel.app`
- `VERCEL_URL` → `https://rep-titan-web-shj7.vercel.app`
- `RENDER_URL` → `https://reptitan-cxw5.onrender.com`

