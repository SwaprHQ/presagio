import { ChainIcon } from 'connectkit';
import { useAccount, useChainId, useChains } from 'wagmi';

export const NetworkButton = () => {
  const chainId = useChainId();
  const supportedChains = useChains();
  const { chainId: connectorChainId } = useAccount();
  const unsupportedNetwork =
    !!connectorChainId &&
    !supportedChains.some(supportedChain => supportedChain.id === connectorChainId);

  return (
    <div className="hidden select-none items-center justify-center space-x-2 rounded-12 bg-surface-surface-2 p-3 md:flex">
      <ChainIcon
        size={18}
        id={connectorChainId || chainId}
        unsupported={unsupportedNetwork}
      />
    </div>
  );
};
