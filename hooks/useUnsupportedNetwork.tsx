import { useAccount, useChains } from 'wagmi';

export const useUnsupportedNetwork = () => {
  const supportedChains = useChains();
  const { chainId } = useAccount();

  return (
    !!chainId && !supportedChains.some(supportedChain => supportedChain.id === chainId)
  );
};
