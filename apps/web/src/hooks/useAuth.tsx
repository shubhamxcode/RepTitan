import { useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
  provider: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/user', {
        credentials: 'include', // Important: Include cookies
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (err) {
      setError('Failed to check authentication');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
      }
    } catch (err) {
      setError('Failed to logout');
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    logout,
    refreshAuth: checkAuth,
  };
};
