# Quick Deployment Reference

## 🚀 Render + Vercel Connection Setup

### Backend (Render) Configuration

**Service Settings:**
- **Root Directory**: `apps/server`
- **Build Command**: `cd ../.. && pnpm install --frozen-lockfile && cd apps/server && pnpm db:generate && pnpm build`
- **Start Command**: `pnpm start`

**Required Environment Variables:**
```env
DATABASE_URL=<PostgreSQL connection string>
NODE_ENV=production
PORT=10000
SESSION_SECRET=<Generate with: openssl rand -base64 32>
CORS_ORIGIN=<Your Vercel URL - update after frontend deployment>
```

**Optional Environment Variables:**
```env
GOOGLE_CLIENT_ID=<For OAuth>
GOOGLE_CLIENT_SECRET=<For OAuth>
```

### Frontend (Vercel) Configuration

**Project Settings:**
- **Root Directory**: `apps/web`
- **Framework**: Vite
- **Build Command**: `pnpm build`
- **Output Directory**: `dist`

**Required Environment Variables:**
```env
VITE_API_URL=<Your Render backend URL>
```

**Optional Environment Variables:**
```env
VITE_GEMINI_API_KEY=<For AI chatbot>
```

## 🔗 Connection Flow

1. **Deploy Backend First** (Render)
   - Get backend URL: `https://your-api.onrender.com`
   
2. **Deploy Frontend** (Vercel)
   - Set `VITE_API_URL` to your Render URL
   - Get frontend URL: `https://your-app.vercel.app`
   
3. **Update Backend CORS**
   - Update `CORS_ORIGIN` in Render to your Vercel URL
   - Backend will auto-redeploy

4. **Update Google OAuth** (if using)
   - Add redirect URI: `https://your-api.onrender.com/auth/google/callback`

## 📝 Environment Files

Copy the example files to create your `.env` files:

**Backend:**
```bash
cp apps/server/env.example apps/server/.env
# Then edit .env with your values
```

**Frontend:**
```bash
cp apps/web/env.example apps/web/.env
# Then edit .env with your values
```

## ✅ Verification Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] `VITE_API_URL` points to Render backend
- [ ] `CORS_ORIGIN` points to Vercel frontend
- [ ] Database migrations run (`pnpm db:push`)
- [ ] Test login/authentication
- [ ] Test API endpoints from frontend
- [ ] No CORS errors in browser console

## 🔧 Troubleshooting

**CORS Errors?**
- Verify `CORS_ORIGIN` matches Vercel URL exactly (no trailing slash)
- Check browser console for specific CORS error messages

**API Not Working?**
- Verify `VITE_API_URL` is correct in Vercel
- Check Render logs for backend errors
- Test backend URL directly: `https://your-api.onrender.com/`

**Database Issues?**
- Verify `DATABASE_URL` is correct
- Run `pnpm db:push` to set up schema
- Check Render database connection status

