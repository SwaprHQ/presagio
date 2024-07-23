'use client';

import { Logo, LogoSizeProp, logoStyles } from '@swapr/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { WXDAI } from '@/constants';
import { XDAI_LOGO } from '@/public/assets';
import { cx } from 'class-variance-authority';
import { useReadToken } from '@/hooks/contracts/erc20';
import { Address } from 'viem';

const localTokenAssets = [{ address: WXDAI.address, asset: XDAI_LOGO.src }];

const fetchImage = async (url: string) => {
  const result = await fetch(url);

  if (result.status === 200) return url;
  else throw 'Image not found';
};

interface TokenLogoProps {
  address: string;
  size?: LogoSizeProp;
  className?: string;
}

export const TokenLogo = ({ address, size, className }: TokenLogoProps) => {
  const [source, setSource] = useState<string | null>();
  const queryClient = useQueryClient();

  const { symbol } = useReadToken({
    tokenAddress: address as Address,
  });

  useEffect(() => {
    const localTokenAsset = localTokenAssets.find(
      ({ address: tokenAddress }) => tokenAddress === address
    );
    if (localTokenAsset) {
      setSource(localTokenAsset.asset);
      return;
    }

    queryClient
      .fetchQuery({
        queryKey: ['getCowprotocolImage', address],
        queryFn: async () =>
          await fetchImage(
            `https://raw.githubusercontent.com/cowprotocol/token-lists/main/src/public/images/100/${address}/logo.png`
          ),
        staleTime: Infinity,
      })
      .then(source => setSource(source))
      .catch(() =>
        queryClient
          .fetchQuery({
            queryKey: ['get1HiveImage', address],
            queryFn: async () =>
              await fetchImage(
                `https://raw.githubusercontent.com/1Hive/default-token-list/master/src/assets/gnosis/${address}/logo.png`
              ),
            staleTime: Infinity,
          })
          .then(source => setSource(source))
          .catch(() => setSource(null))
      );
  }, [address, queryClient]);

  if (source === undefined)
    return (
      <div className={cx(logoStyles({ size }), 'animate-pulse bg-outline-low-em')} />
    );

  if (source === null)
    return (
      <div className={cx(logoStyles({ size }), 'text-[6px] font-bold text-text-black')}>
        {symbol}
      </div>
    );

  return (
    <Logo src={source} alt={symbol + ' token logo'} size={size} className={className} />
  );
};
