# Google Authentication Setup

## What Was Implemented

Google OAuth 2.0 authentication has been successfully integrated into your application. When users click "Continue with Google", they will be authenticated via Google and their data will be saved to your PostgreSQL database.

## Changes Made

### 1. Database Schema Updates (`apps/server/prisma/schema/schema.prisma`)
- Made `password` field optional (for OAuth users)
- Added `googleId` field to store Google user IDs
- Added `provider` field to track authentication method ("local" or "google")
- Added `createdAt` and `updatedAt` timestamps

### 2. Backend Implementation

#### Passport Configuration (`apps/server/src/config/passport.ts`)
- Configured Google OAuth 2.0 strategy
- Handles user creation and linking existing accounts
- Session serialization/deserialization

#### Authentication Routes (`apps/server/src/routers/auth.ts`)
- `GET /auth/google` - Initiates Google OAuth flow
- `GET /auth/google/callback` - Handles OAuth callback
- `POST /auth/logout` - Logs out the user
- `GET /auth/user` - Returns current authenticated user

#### Server Configuration (`apps/server/src/index.ts`)
- Added Express session middleware
- Initialized Passport with session support
- Enabled CORS with credentials
- Mounted authentication routes

### 3. Frontend Implementation (`apps/web/src/routes/auth/Login.tsx`)
- Added click handler to Google button
- Redirects to backend OAuth endpoint
- Improved Google logo SVG

### 4. Environment Variables (`apps/server/.env`)
- Added `SESSION_SECRET` for session encryption

## Next Steps

### 1. Start the Database
```bash
cd apps/server
npm run db:start
```

### 2. Push Database Schema
```bash
npm run db:push
```

### 3. Start the Backend Server
```bash
npm run dev
```

### 4. Start the Frontend
```bash
cd ../web
npm run dev
```

## How It Works

1. User clicks "Continue with Google" button
2. Frontend redirects to `http://localhost:3000/auth/google`
3. Backend redirects to Google's OAuth consent screen
4. User approves the app
5. Google redirects back to `http://localhost:3000/auth/google/callback`
6. Backend:
   - Receives user profile from Google
   - Checks if user exists by `googleId`
   - If not, checks if email exists (links account)
   - If new user, creates account in database
   - Establishes session
7. Backend redirects to frontend with success flag
8. User is now authenticated

## Google OAuth Configuration

Your Google OAuth credentials are already configured in `.env`:
- `GOOGLE_CLIENT_ID` - Your Google application client ID
- `GOOGLE_CLIENT_SECRET` - Your Google application client secret

**Important**: Make sure your Google Cloud Console OAuth 2.0 configuration includes:
- Authorized JavaScript origins: `http://localhost:3001` (your frontend URL)
- Authorized redirect URIs: `http://localhost:3000/auth/google/callback` (your backend URL)

## User Data Storage

When a user signs in with Google, the following data is saved:
- `email` - User's Google email
- `name` - User's Google display name
- `googleId` - Unique Google user ID
- `provider` - Set to "google"
- `password` - NULL (not needed for OAuth users)

## Testing

1. Ensure Docker is running (for the database)
2. Start the database: `npm run db:start`
3. Push the schema: `npm run db:push`
4. Start backend: `npm run dev` (in apps/server)
5. Start frontend: `npm run dev` (in apps/web)
6. Navigate to the login page
7. Click "Continue with Google"
8. Sign in with your Google account
9. Check the database to verify user was created

## Using Authentication in Your Frontend

A custom React hook `useAuth` has been created in `apps/web/src/hooks/useAuth.tsx` to help manage authentication state.

### Example Usage:

```tsx
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { user, loading, isAuthenticated, logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        <p>Welcome, {user?.name}!</p>
        <p>Email: {user?.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return <div>Please login</div>;
}
```

### Available Hook Methods:
- `user` - Current user object (or null)
- `loading` - Loading state
- `error` - Error message (if any)
- `isAuthenticated` - Boolean indicating if user is logged in
- `logout()` - Function to logout the user
- `refreshAuth()` - Function to manually refresh auth state

## Security Notes

- Sessions are stored in-memory (consider using PostgreSQL session store for production)
- Change `SESSION_SECRET` to a strong random value in production
- HTTPS should be used in production
- Cookie is set to `secure: true` in production mode 