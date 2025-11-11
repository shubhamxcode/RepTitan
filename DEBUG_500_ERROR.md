# Debugging 500 Error Guide

## ✅ What We Just Fixed

1. ✅ Generated Prisma Client (`pnpm db:generate`)
2. ✅ Pushed schema to Neon DB (`pnpm db:push`)
3. ✅ Created `UserGoalDetail` table in database

## 🔧 Next: Restart Development Servers

**The 500 error happens because the running server is using the OLD Prisma client (without UserGoalDetail model).**

### Stop Current Servers (if running)
Press `Ctrl+C` in both terminal windows

### Start Fresh

**Terminal 1 - Backend:**
```bash
cd /home/shubhamvarshney/webdevelopment/RepTitan-fullstack/RepTitan
pnpm dev:server
```

**Terminal 2 - Frontend:**
```bash
cd /home/shubhamvarshney/webdevelopment/RepTitan-fullstack/RepTitan
pnpm dev:web
```

---

## 🐛 If 500 Error Still Occurs

### 1. Check Server Console
Look in Terminal 1 (backend) for error messages like:
```
Error: Unknown field: UserGoalDetail
Error: Table 'UserGoalDetail' doesn't exist
```

### 2. Verify Database Connection
Check `apps/server/.env` has your Neon DB URL:
```env
DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require"
```

### 3. Check Browser Network Tab
- Open browser DevTools (F12)
- Go to Network tab
- Try to save a goal
- Click on the failed request
- Look at "Response" tab for detailed error message

### 4. Test Database Connection
```bash
cd /home/shubhamvarshney/webdevelopment/RepTitan-fullstack/RepTitan
pnpm db:studio
```
This opens Prisma Studio - you should see `UserGoalDetail` table

### 5. Check API Endpoint
Open browser and go to:
```
http://localhost:3000/goals/1
```
Should return either:
- 404 (no goal yet) - THIS IS FINE!
- 200 with data (if goal exists)
- NOT 500!

---

## 🔍 Common Issues

### Issue: "Cannot find module './prisma/generated/client'"
**Fix:**
```bash
pnpm db:generate
# Restart server
```

### Issue: "Table UserGoalDetail doesn't exist"
**Fix:**
```bash
pnpm db:push
# Restart server
```

### Issue: CORS error
**Fix:** Check `apps/server/.env`:
```env
CORS_ORIGIN="http://localhost:3001"
```

### Issue: "userId is required"
This means the save is working but missing userId!
Check frontend code has:
```typescript
const userId = 1; // Should be present
```

---

## ✅ Success Indicators

When working correctly, you should see:

**Browser Console:**
- No red errors
- Network tab shows `POST /goals/save` with status 200

**Backend Console:**
- No errors
- Might see Prisma query logs

**Database:**
- `pnpm db:studio` shows UserGoalDetail with saved data

---

## 📞 Still Having Issues?

Share these details:
1. Complete error message from browser console
2. Server console output
3. Which step causes the error (page load or save?)
4. Output of: `pnpm db:generate` (already ran successfully)
5. Output of: `pnpm db:push` (already ran successfully)

