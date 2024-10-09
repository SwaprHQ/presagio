import { useState } from 'react';
import { Icon, IconButton } from '@swapr/ui';
import { GNOSIS_SCAN_URL, KLEROS_URL, REALITY_QUESTION_URL } from '@/constants';
import { shortenAddress } from '@/utils';
import { FixedProductMarketMaker } from '@/queries/omen';

interface InfoProps {
  fixedProductMarketMaker: FixedProductMarketMaker;
}
export const Info = ({ fixedProductMarketMaker }: InfoProps) => {
  const [clipboardIcon, setClipboardIcon] = useState<'copy' | 'tick'>('copy');
  const id = fixedProductMarketMaker.id;

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
      {fixedProductMarketMaker.question && (
        <a
          href={`${REALITY_QUESTION_URL}${fixedProductMarketMaker.question.id}`}
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
