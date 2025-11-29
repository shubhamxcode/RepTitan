# Environment Variables Quick Reference

## 🎯 Frontend (Vercel) - Required

### VITE_API_URL
**What it does:** Tells your frontend where to find the backend API

**Value:** Your Render backend URL
```env
VITE_API_URL=https://your-api.onrender.com
```

**Where to set:** Vercel Dashboard → Project → Settings → Environment Variables

**Example:**
```env
VITE_API_URL=https://reptitan-api.onrender.com
```

---

## 🎯 Frontend (Vercel) - Optional

### VITE_GEMINI_API_KEY
**What it does:** Enables the AI chatbot feature

**Value:** Your Google Gemini API key
```env
VITE_GEMINI_API_KEY=AIzaSyAbc123xyz789
```

**Where to get:** https://makersuite.google.com/app/apikey

**Note:** Only add this if you're using the chatbot feature

---

## 🎯 Backend (Render) - Required

### CORS_ORIGIN
**What it does:** Allows your Vercel frontend to make API requests

**Value:** Your Vercel frontend URL
```env
CORS_ORIGIN=https://your-app.vercel.app
```

**Important:** 
- Must match your Vercel URL exactly
- No trailing slash
- This fixes the localhost redirect issue!

### DATABASE_URL
**What it does:** Connects to your PostgreSQL database

**Value:** From Render PostgreSQL service
```env
DATABASE_URL=postgresql://user:pass@host:port/db
```

**Where to get:** Render Dashboard → PostgreSQL Service → Internal Database URL

### PORT
**What it does:** Server port (Render uses 10000)

**Value:**
```env
PORT=10000
```

### NODE_ENV
**What it does:** Sets environment to production

**Value:**
```env
NODE_ENV=production
```

### SESSION_SECRET
**What it does:** Encrypts user sessions

**Value:** Generate with: `openssl rand -base64 32`
```env
SESSION_SECRET=your-generated-secret
```

---

## 🎯 Backend (Render) - Optional

### BACKEND_URL
**What it does:** Helps OAuth callbacks work correctly

**Value:** Your Render backend URL
```env
BACKEND_URL=https://your-api.onrender.com
```

### GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET
**What it does:** Enables Google OAuth login

**Values:**
```env
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

**Where to get:** Google Cloud Console → APIs & Services → Credentials

---

## 📋 Complete Setup Checklist

### Vercel (Frontend):
- [ ] `VITE_API_URL` = Your Render backend URL
- [ ] `VITE_GEMINI_API_KEY` (optional, for chatbot)

### Render (Backend):
- [ ] `CORS_ORIGIN` = Your Vercel frontend URL ⚠️ **CRITICAL**
- [ ] `DATABASE_URL` = From Render PostgreSQL
- [ ] `PORT` = 10000
- [ ] `NODE_ENV` = production
- [ ] `SESSION_SECRET` = Generated secret
- [ ] `BACKEND_URL` = Your Render backend URL (optional)
- [ ] `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` (if using OAuth)

---

## 🔗 Connection Flow

```
User → Vercel Frontend (uses VITE_API_URL)
                ↓
        Render Backend (checks CORS_ORIGIN)
                ↓
        PostgreSQL Database
```

**Both must match:**
- Frontend `VITE_API_URL` = Backend service URL
- Backend `CORS_ORIGIN` = Frontend Vercel URL

---

## ⚠️ Common Mistakes

1. **Wrong CORS_ORIGIN**
   - ❌ `http://localhost:3001`
   - ✅ `https://your-app.vercel.app`

2. **Trailing slashes**
   - ❌ `https://your-app.vercel.app/`
   - ✅ `https://your-app.vercel.app`

3. **Wrong protocol**
   - ❌ `http://your-app.vercel.app`
   - ✅ `https://your-app.vercel.app`

4. **Missing VITE_ prefix**
   - ❌ `API_URL=...`
   - ✅ `VITE_API_URL=...`

---

## 🚀 Quick Setup Commands

### Generate Session Secret:
```bash
openssl rand -base64 32
```

### Test API Connection:
```bash
# Test backend is accessible
curl https://your-api.onrender.com/

# Should return: OK
```

