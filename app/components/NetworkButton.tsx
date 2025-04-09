import { ChainIcon } from 'connectkit';
import { useChainId, useAccount } from 'wagmi';
import { useUnsupportedNetwork } from '@/hooks';

export const NetworkButton = () => {
  const chainId = useChainId();
  const { chainId: connectorChainId } = useAccount();

  const unsupportedNetwork = useUnsupportedNetwork();

  return (
    <div className="hidden select-none items-center justify-center space-x-2 rounded-12 bg-surface-surface-smoke-gray p-3 md:flex">
      <ChainIcon
        size={18}
        id={connectorChainId || chainId}
        unsupported={unsupportedNetwork}
      />
    </div>
  );
};
