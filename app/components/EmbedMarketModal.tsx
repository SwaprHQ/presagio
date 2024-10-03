'use client';

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Tag,
} from '@swapr/ui';
import { ModalId, useModal } from '@/context/ModalContext';
import { Market } from '@/entities';
import { MarketThumbnail } from '@/app/components/MarketThumbnail';
import { remainingTime } from '@/utils';
import { OutcomeBar } from '@/app/components/OutcomeBar';
import { APP_NAME, APP_URL } from '@/constants';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
interface EmbedMarketModalProps {
  id: string;
  fixedProductMarketMaker: any;
}

export const EmbedMarketModal = ({
  id,
  fixedProductMarketMaker,
}: EmbedMarketModalProps) => {
  const { isModalOpen, closeModal } = useModal();
  const marketModel = new Market(fixedProductMarketMaker);
  const closingDate = new Date(+fixedProductMarketMaker.openingTimestamp * 1000);

  const close = () => {
    closeModal(ModalId.EMBED_MARKET);
  };

  const iframeCode = `<iframe
  title="presagio-market-iframe"
  src="${APP_URL}/embed/market?id=${id}"
  width="384"
  height="180"
></iframe>`;

  return (
    <Dialog open={isModalOpen(ModalId.EMBED_MARKET)} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Embed Market</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-6 px-6">
          <div className="space-y-2">
            <h3 className="font-bold">Embed Code</h3>
            <div className="rounded-16">
              <SyntaxHighlighter language="javascript" style={atomDark}>
                {iframeCode}
              </SyntaxHighlighter>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold">Preview</h3>
            <div className="w-full rounded-16 border border-outline-base-em bg-surface-surface-0">
              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <Tag className="w-fit capitalize" size="sm" colorScheme="quaternary">
                    {fixedProductMarketMaker.category}
                  </Tag>
                  {marketModel.isClosed ? (
                    <Tag className="w-fit capitalize" size="sm" colorScheme="quaternary">
                      Market Closed
                    </Tag>
                  ) : (
                    <p className="text-sm text-text-med-em">
                      {remainingTime(closingDate)}
                    </p>
                  )}
                </div>
                <div className="flex space-x-4">
                  <MarketThumbnail
                    width={20}
                    height={20}
                    className="size-20 flex-shrink-0 rounded-8"
                    marketId={fixedProductMarketMaker.id}
                  />
                  <h1 className="text-xl font-semibold">
                    {fixedProductMarketMaker.title}
                  </h1>
                </div>
                <div className="!mt-7">
                  <OutcomeBar market={fixedProductMarketMaker} />
                </div>
                <p className="text-center">
                  Bet on{' '}
                  <a href={APP_URL} target="_blank" className="text-text-primary-main">
                    {APP_NAME}.eth
                  </a>
                </p>
              </div>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
