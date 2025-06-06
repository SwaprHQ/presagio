import { useState } from 'react';

import { Icon, IconButton } from '@swapr/ui';
import { trackEvent } from 'fathom-client';

import { FA_EVENTS } from '@/analytics';
import { KLEROS_URL, REALITY_QUESTION_URL } from '@/constants';
import { FixedProductMarketMaker } from '@/queries/omen';
import { getExplorerAddressUrl, shortenAddress } from '@/utils';

interface InfoProps {
  fixedProductMarketMaker: FixedProductMarketMaker;
}
export const Info = ({ fixedProductMarketMaker }: InfoProps) => {
  const [clipboardIcon, setClipboardIcon] = useState<'copy' | 'tick'>('copy');
  const address = fixedProductMarketMaker.id;
  const questionId = fixedProductMarketMaker.question?.id;

  return (
    <>
      <div className="flex items-center space-x-1 py-4">
        <span>{shortenAddress(address)}</span>
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(address);
            setClipboardIcon('tick');

            setTimeout(() => {
              setClipboardIcon('copy');
            }, 3000);
          }}
          variant="ghost"
          name={clipboardIcon}
          size="xs"
        />
      </div>
      <a
        href={getExplorerAddressUrl(address)}
        target="_blank"
        className="flex items-center space-x-1 py-4"
        onClick={() => trackEvent(FA_EVENTS.MARKETS.DETAILS.INFO.CONTRACT)}
      >
        <span>View market contract</span>
        <Icon name="arrow-top-right" size={16} />
      </a>
      {questionId && (
        <a
          href={`${REALITY_QUESTION_URL}${questionId}`}
          target="_blank"
          className="flex items-center space-x-1 py-4"
          onClick={() => trackEvent(FA_EVENTS.MARKETS.DETAILS.INFO.ORACLE_ANSWER)}
        >
          <p>
            <span>
              Answer oracle by <span className="font-semibold">reality.eth</span>
            </span>
          </p>
          <Icon name="arrow-top-right" size={16} />
        </a>
      )}
      <a
        href={KLEROS_URL}
        target="_blank"
        className="flex items-center space-x-1 py-4"
        onClick={() => trackEvent(FA_EVENTS.MARKETS.DETAILS.INFO.DISPUTE)}
      >
        <p>
          <span>
            Dispute resolution by <span className="font-semibold">kleros.io</span>
          </span>
        </p>
        <Icon name="arrow-top-right" size={16} />
      </a>
    </>
  );
};
