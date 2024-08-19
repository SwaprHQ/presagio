import { useState } from 'react';
import { shortenAddress } from '../../utils';
import { Icon, IconButton } from '@swapr/ui';
import { FixedProductMarketMaker } from '../../queries/omen';
import { GNOSIS_SCAN_URL, KLEROS_URL, REALITY_QUESTION_URL } from '@/constants';

export const Info = ({ market }: { market: FixedProductMarketMaker }) => {
  const [clipboardIcon, setClipboardIcon] = useState<'copy' | 'tick'>('copy');
  const id = market.id;

  return (
    <>
      <div className="flex items-center space-x-1 py-4">
        <span>{shortenAddress(id)}</span>
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(id);
            setClipboardIcon('tick');

            setTimeout(() => {
              setClipboardIcon('copy');
            }, 3000);
          }}
          variant="ghost"
          name={clipboardIcon}
          size="sm"
        />
      </div>
      <a
        href={`${GNOSIS_SCAN_URL}/address/${id}`}
        target="_blank"
        className="flex items-center space-x-1 py-4"
      >
        <span>View market contract</span>
        <Icon name="arrow-top-right" size={16} />
      </a>
      {market.question && (
        <a
          href={`${REALITY_QUESTION_URL}${market.question.id}`}
          target="_blank"
          className="flex items-center space-x-1 py-4"
        >
          <p>
            <span>
              Answer oracle by <span className="font-bold">reality.eth</span>
            </span>
          </p>
          <Icon name="arrow-top-right" size={16} />
        </a>
      )}
      <a href={KLEROS_URL} target="_blank" className="flex items-center space-x-1 py-4">
        <p>
          <span>
            Dispute resolution by <span className="font-bold">kleros.io</span>
          </span>
        </p>
        <Icon name="arrow-top-right" size={16} />
      </a>
    </>
  );
};
