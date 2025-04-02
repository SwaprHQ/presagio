'use client';

import { getExplorerTxUrl, shortenAddress } from '@/utils';
import { successToast, toast } from '@swapr/ui';
import { Outcome, Token } from '@/entities';
import { Spinner } from './Spinner';

const AddressLink = ({ txHash }: { txHash: string }) => (
  <a
    href={getExplorerTxUrl(txHash)}
    target="_blank"
    className="inline-block text-text-primary-high-em underline"
  >
    {shortenAddress(txHash)}
  </a>
);

export const successApprovalTxToast = (txHash: string, token: Token | Outcome) => {
  const symbol = token.symbol || '';

  successToast({
    children: (
      <div>
        <p>{symbol} approved </p>
        <AddressLink txHash={txHash} />
      </div>
    ),
  });
};

export const waitingTxToast = (txHash: string) =>
  toast({
    children: (
      <div className="flex items-center space-x-4">
        <Spinner className="h-5 w-5 shrink-0 animate-spin" />
        <div>
          <p>Wating for transaction confirmation </p>
          <AddressLink txHash={txHash} />
        </div>
      </div>
    ),
  });
