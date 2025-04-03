'use client';

import { Button } from '@swapr/ui';
import { useSession } from '@/context/SessionContext';
import { useAuth } from '@/hooks/useAuth';
import { useAccount } from 'wagmi';
import { ConnectButton, Spinner } from '@/app/components';

export default function SessionScreen() {
  const { isLoggedIn, loading } = useSession();
  const { connect } = useAuth();
  const { isConnected } = useAccount();

  if (isLoggedIn) return null;

  if (loading)
    return (
      <div className="mx-auto pt-64">
        <Spinner className="h-5 w-5 animate-spin" />
      </div>
    );

  return (
    <div className="mx-auto flex h-[calc(100vh-208px)] w-full max-w-md flex-col items-center space-y-10 p-10 pt-64">
      <p className="text-center text-xl font-semibold">Sign in to access chat</p>
      {isConnected ? (
        <Button onClick={connect} width="full">
          Sign message
        </Button>
      ) : (
        <ConnectButton variant="solid" width="full" />
      )}
    </div>
  );
}
