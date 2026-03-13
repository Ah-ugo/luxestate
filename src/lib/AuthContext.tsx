/** @format */

'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';

interface User {
  email: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('lux_token');
      if (token) {
        try {
          const res = await authApi.getMe();
          setUser(res.data);
        } catch (error) {
          console.error('Auth check failed', error);
          localStorage.removeItem('lux_token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('lux_token');
    setUser(null);
    router.push('/login');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.is_superuser || false;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, isAdmin, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
