import { useState, useCallback } from 'react';
import { SiweMessage } from 'siwe';
import { useAccount, useSignMessage, useDisconnect } from 'wagmi';
import { useSession } from '@/context/SessionContext';

export function useAuth() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const { refreshSession, logout } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!address) {
        throw new Error('No wallet connected');
      }

      const nonceRes = await fetch(
        process.env.NEXT_PUBLIC_PRESAGIO_CHAT_API_URL + '/api/auth/nonce',
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const { nonce } = await nonceRes.json();

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to PM Chatbot',
        uri: window.location.origin,
        version: '1',
        chainId: 1,
        nonce,
      });

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      const verifyRes = await fetch(
        process.env.NEXT_PUBLIC_PRESAGIO_CHAT_API_URL + '/api/auth/verify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ message, signature }),
        }
      );

      if (!verifyRes.ok) {
        const error = await verifyRes.json();
        throw new Error(error.error);
      }

      await refreshSession();
      return { address };
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [address, signMessageAsync, refreshSession]);

  const disconnectWallet = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      await logout();
      await refreshSession();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [logout, refreshSession]);

  return {
    connect,
    disconnect: disconnectWallet,
    isLoading,
    error,
    address,
  };
}
