'use client';

import { shortenAddress } from '@/utils';
import { successToast, toast } from '@swapr/ui';
import { GNOSIS_SCAN_URL } from '@/constants';
import { Outcome, Token } from '@/entities';
import { Spinner } from './Spinner';

const AddressLink = ({ txHash }: { txHash: string }) => (
  <a
    href={`${GNOSIS_SCAN_URL}/tx/${txHash}`}
    target="_blank"
    className="inline-block underline"
  >
    {shortenAddress(txHash)}
  </a>
);

export const successApprovalTxToast = (txHash: string, token: Token | Outcome) => {
  const symbol = token.symbol || '';

  successToast({
    children: (
      <div className="font-normal">
        {symbol} approved successfully <AddressLink txHash={txHash} />
      </div>
    ),
  });
};

export const waitingTxToast = (txHash: string) =>
  toast({
    children: (
      <div className="flex items-center space-x-4">
        <Spinner className="h-5 w-5 shrink-0 animate-spin" />
        <div className="font-normal">
          Wating for transaction confirmation <AddressLink txHash={txHash} />
        </div>
      </div>
    ),
  });
