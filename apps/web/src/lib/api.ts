/**
 * API Configuration
 * Centralized API URL management for connecting to the backend server
 */

// Get API URL from environment variable (RENDER_URL) or use default
// Note: In Vite, env vars must start with VITE_ to be exposed
// So RENDER_URL should be set as VITE_RENDER_URL in Vercel
export const API_URL = import.meta.env.VITE_RENDER_URL || import.meta.env.RENDER_URL || "http://localhost:3000";

// Log API URL for debugging (only in development)
if (import.meta.env.DEV) {
  console.log("API URL configured:", API_URL);
}

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

/**
 * API fetch wrapper with credentials included for cross-origin requests
 * Always use this for API calls to ensure cookies are sent
 */
export async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const defaultOptions: RequestInit = {
    credentials: "include", // Always include cookies for cross-origin auth
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  return fetch(url, { ...defaultOptions, ...options });
}

/**
 * API GET request helper
 */
export async function apiGet(url: string): Promise<Response> {
  return apiFetch(url, { method: "GET" });
}

/**
 * API POST request helper
 */
export async function apiPost(url: string, data?: unknown): Promise<Response> {
  return apiFetch(url, {
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * API DELETE request helper
 */
export async function apiDelete(url: string): Promise<Response> {
  return apiFetch(url, { method: "DELETE" });
}

