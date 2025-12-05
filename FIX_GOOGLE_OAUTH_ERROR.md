# Fix Google OAuth Error 400: redirect_uri_mismatch

## Problem
Google is blocking the OAuth request because the redirect URI doesn't match what's configured in Google Cloud Console.

## Solution

### Step 1: Find Your Current Redirect URI

Your backend is configured to use:
- **Render URL:** `https://reptitan-cxw5.onrender.com`
- **Callback Path:** `/auth/google/callback`
- **Full Redirect URI:** `https://reptitan-cxw5.onrender.com/auth/google/callback`

### Step 2: Add Redirect URI in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to **APIs & Services** → **Credentials**
4. Find your **OAuth 2.0 Client ID** (the one you're using for this app)
5. Click **Edit** (pencil icon)
6. Scroll down to **Authorized redirect URIs**
7. Click **+ ADD URI**
8. Add this exact URI:
   ```
   https://reptitan-cxw5.onrender.com/auth/google/callback
   ```
9. **Important:** Make sure there's no trailing slash
10. Click **SAVE**

### Step 3: Also Add for Local Development (Optional)

If you want to test locally, also add:
```
http://localhost:3000/auth/google/callback
```

### Step 4: Verify Environment Variables in Render

Make sure in Render Dashboard → Your Service → Environment:

```env
RENDER_URL=https://reptitan-cxw5.onrender.com
```

**Important:** 
- No trailing slash
- Use `https://` (not `http://`)
- Must match exactly: `https://reptitan-cxw5.onrender.com`

### Step 5: Wait and Test

1. **Wait 5-10 minutes** after saving in Google Cloud Console (changes can take time to propagate)
2. Clear your browser cache/cookies for Google
3. Try logging in again

## Complete List of Redirect URIs to Add

In Google Cloud Console, add these redirect URIs:

### Production (Required):
```
https://reptitan-cxw5.onrender.com/auth/google/callback
```

### Local Development (Optional):
```
http://localhost:3000/auth/google/callback
```

## Verification Checklist

- [ ] Added `https://reptitan-cxw5.onrender.com/auth/google/callback` in Google Cloud Console
- [ ] No trailing slash on the redirect URI
- [ ] `RENDER_URL` is set correctly in Render environment variables
- [ ] Waited 5-10 minutes after saving
- [ ] Cleared browser cache/cookies
- [ ] Tried logging in again

## Common Mistakes

❌ **Wrong URI format:**
- `https://reptitan-cxw5.onrender.com/auth/google/callback/` (trailing slash)
- `http://reptitan-cxw5.onrender.com/auth/google/callback` (http instead of https)
- `reptitan-cxw5.onrender.com/auth/google/callback` (missing https://)

✅ **Correct URI:**
- `https://reptitan-cxw5.onrender.com/auth/google/callback`

## Still Not Working?

1. **Check Render Logs:**
   - Go to Render Dashboard → Your Service → **Logs**
   - Look for the OAuth callback URL being used
   - Verify it matches what you added in Google Cloud Console

2. **Double-check the URL:**
   - The redirect URI must match **exactly** (case-sensitive, no trailing slash)

3. **Verify RENDER_URL in Render:**
   - Make sure `RENDER_URL=https://reptitan-cxw5.onrender.com` is set
   - No trailing slash, no extra spaces

4. **Check Google Cloud Console:**
   - Make sure you're editing the correct OAuth Client ID
   - The one that matches your `GOOGLE_CLIENT_ID` in Render

