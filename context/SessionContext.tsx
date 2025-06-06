'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface SessionContextType {
  isLoggedIn: boolean;
  address: string | null;
  userId: string | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { address: walletAddress } = useAccount();

  const refreshSession = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_PRESAGIO_CHAT_API_URL + '/api/auth/session',
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const data = await res.json();
      setIsLoggedIn(data.isLoggedIn);
      setAddress(data.address);
      setUserId(data.userId);
    } catch (error) {
      setIsLoggedIn(false);
      setAddress(null);
      setUserId(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch(process.env.NEXT_PUBLIC_PRESAGIO_CHAT_API_URL + '/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  };

  useEffect(() => {
    refreshSession();
  }, []);

  useEffect(() => {
    const logoutAndCleanSession = async () => {
      try {
        await logout();
        setIsLoggedIn(false);
        setAddress(null);
        setUserId(null);
      } catch (e) {
        console.error(e);
      }
    };

    if (isLoggedIn && walletAddress !== address) {
      logoutAndCleanSession();
    }
  }, [walletAddress, address, isLoggedIn]);

  return (
    <SessionContext.Provider
      value={{ isLoggedIn, address, userId, loading, refreshSession, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
