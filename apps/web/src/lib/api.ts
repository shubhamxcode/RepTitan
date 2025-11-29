/**
 * API Configuration
 * Centralized API URL management for connecting to the backend server
 */

// Get API URL from environment variable (RENDER_URL) or use default
// Note: In Vite, env vars must start with VITE_ to be exposed
// So RENDER_URL should be set as VITE_RENDER_URL in Vercel
export const API_URL = import.meta.env.VITE_RENDER_URL || import.meta.env.RENDER_URL || "http://localhost:3000";

/**
 * Get the full API endpoint URL
 * @param endpoint - API endpoint path (e.g., "/auth/user")
 * @returns Full URL to the API endpoint
 */
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  return `${API_URL}/${cleanEndpoint}`;
};

/**
 * Common API endpoints
 */
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    USER: getApiUrl("/auth/user"),
    LOGOUT: getApiUrl("/auth/logout"),
    GOOGLE: getApiUrl("/auth/google"),
  },
  // Goals endpoints
  GOALS: {
    GET: (userId: number) => getApiUrl(`/goals/${userId}`),
    SAVE: getApiUrl("/goals/save"),
    DELETE: (userId: number) => getApiUrl(`/goals/${userId}`),
    EXERCISE: {
      SAVE: getApiUrl("/goals/exercise/save"),
      STATS: (userId: number, days: number = 7) => 
        getApiUrl(`/goals/exercise/${userId}/stats?days=${days}`),
    },
  },
} as const;

