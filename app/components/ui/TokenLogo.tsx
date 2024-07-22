'use client';

import { Logo, LogoSizeProp } from '@swapr/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { WXDAI } from '@/constants';
import { XDAI_LOGO, DEFAULT_TOKEN_LOGO } from '@/public/assets';

const localTokenAssets = [{ address: WXDAI.address, asset: XDAI_LOGO.src }];

const fetchImage = async (url: string) => {
  const result = await fetch(url);

  if (result.status === 200) return url;
  else throw null;
};
interface TokenLogoProps {
  address: string;
  size?: LogoSizeProp;
  className?: string;
}

export const TokenLogo = ({ address, size, className }: TokenLogoProps) => {
  const [source, setSource] = useState<string>();
  const queryClient = useQueryClient();

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
          .catch(() => setSource(DEFAULT_TOKEN_LOGO.src))
      );
  }, [address, queryClient]);

  if (!source) return;

  return <Logo src={source} alt="token logo" size={size} className={className} />;
};
