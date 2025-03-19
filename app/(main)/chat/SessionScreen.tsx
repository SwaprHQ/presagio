'use client';

import { Button } from '@swapr/ui';
import { useSession } from '@/context/SessionContext';
import { useAuth } from '../../../hooks/useAuth';
import { useAccount } from 'wagmi';
import { ConnectButton } from '../../components';

export default function SessionScreen() {
  const { isLoggedIn, loading } = useSession();
  const { connect } = useAuth();
  const { isConnected } = useAccount();

  if (isLoggedIn) return null;

  if (loading) return null;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center space-y-10 p-10 pt-20">
      <p className="text-center text-xl font-semibold">
        Sign in to access chat functionalities
      </p>
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
