import { Address, erc20Abi } from 'viem';
import { gnosis } from 'viem/chains';
import { UseReadContractParameters, useReadContract, useReadContracts } from 'wagmi';

export const useReadERC20Contract = ({
  address,
  functionName,
  args,
  query,
}: UseReadContractParameters<typeof erc20Abi>) => {
  return useReadContract({
    abi: erc20Abi,
    address,
    functionName,
    args,
    query,
    chainId: gnosis.id,
  });
};

export const useReadBalanceOf = ({
  tokenAddress,
  address = '0x',
}: {
  tokenAddress: Address;
  address?: Address;
}) =>
  useReadERC20Contract({
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [address],
    query: { enabled: !!address },
  });

export const useReadAllowance = ({
  tokenAddress,
  spenderAddress = '0x',
  address = '0x',
}: {
  tokenAddress: Address;
  spenderAddress?: Address;
  address?: Address;
}) =>
  useReadERC20Contract({
    address: tokenAddress,
    functionName: 'allowance',
    args: [address, spenderAddress],
    query: { enabled: !!address },
  });

export const useReadToken = ({ tokenAddress }: { tokenAddress: Address }) => {
  const erc20Contract = {
    address: tokenAddress,
    abi: erc20Abi,
    chainId: gnosis.id,
  };

  const { data } = useReadContracts({
    contracts: [
      {
        ...erc20Contract,
        functionName: 'name',
      },
      {
        ...erc20Contract,
        functionName: 'symbol',
      },
      {
        ...erc20Contract,
        functionName: 'decimals',
      },
    ],
  });

  const name = data?.[0].status === 'success' ? data?.[0].result : null;
  const symbol = data?.[1].status === 'success' ? data?.[1].result : null;
  const decimals = data?.[2].status === 'success' ? data?.[2].result : null;

  return { name, symbol, decimals };
};
