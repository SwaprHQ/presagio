import { useReadBalanceOf } from '@/hooks/contracts/erc20';
import { useAccount, useReadContract } from 'wagmi';
import { Address } from 'viem';
import { formatEtherWithFixedDecimals } from '@/utils';
import { MarketABI } from '@/abi';

interface UserLiquidityProps {
  id: Address;
}

export const UserLiquidity = ({ id }: UserLiquidityProps) => {
  const { address } = useAccount();

  const { data: fundingBalance } = useReadBalanceOf({
    tokenAddress: id,
    address,
  });

  const { data: totalSupply } = useReadContract({
    abi: MarketABI,
    address: id,
    functionName: 'totalSupply',
  });

  if (!fundingBalance || fundingBalance === BigInt(0) || !totalSupply) return null;

  const percentageOfSupply = (
    (parseFloat(fundingBalance.toString()) / parseFloat(totalSupply.toString())) *
    100
  ).toFixed(2);

  return (
    <div className="space-y-2">
      <p className="text-text-low-em">Your liquidity position: </p>
      <div className="w-full max-w-[464px] space-y-4 divide-y-2 divide-outline-base-em rounded-16 border border-outline-base-em bg-surface-surface-0 py-4 text-center">
        <div className="flex items-center space-x-2 divide-x-2 divide-outline-base-em px-4">
          <div className="flex w-full flex-wrap items-center justify-between py-1 pl-2">
            <p className="font-semibold">
              {formatEtherWithFixedDecimals(fundingBalance as bigint, 5)}{' '}
              <span className="text-text-low-em">Pool tokens</span>
            </p>
            <p className="font-semibold">
              {percentageOfSupply}
              {'% '}
              <span className="text-text-low-em">of total supply</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
