/**
 * API Configuration
 * Centralized API URL management for connecting to the backend server
 * 
 * Automatically detects environment:
 * - localhost:3001 → uses localhost:3000 (local backend)
 * - rep-titan-web-shj7.vercel.app → uses reptitan-cxw5.onrender.com (Render backend)
 */

const PRODUCTION_API_URL = "https://reptitan-cxw5.onrender.com";
const LOCAL_API_URL = "http://localhost:3000";

// Detect if running on localhost or production based on current URL
const isLocalhost = typeof window !== "undefined" && 
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

// Use localhost:3000 for local dev, Render URL for production (Vercel)
export const API_URL = isLocalhost ? LOCAL_API_URL : PRODUCTION_API_URL;

// Log API URL for debugging
console.log("🔗 API URL configured:", API_URL, isLocalhost ? "(local)" : "(production)");

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

