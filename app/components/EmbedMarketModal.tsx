'use client';

import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle } from '@swapr/ui';
import { ModalId, useModal } from '@/context/ModalContext';
import { APP_URL } from '@/constants';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { EmbedMarketCard } from '@/app/components/EmbedMarketCard';
interface EmbedMarketModalProps {
  id: string;
  fixedProductMarketMaker: any;
}

export const EmbedMarketModal = ({
  id,
  fixedProductMarketMaker,
}: EmbedMarketModalProps) => {
  const { isModalOpen, closeModal } = useModal();

  const close = () => {
    closeModal(ModalId.EMBED_MARKET);
  };

  const iframeCode = `<iframe
  title="presagio-market-iframe"
  src="${APP_URL}/embed/market?id=${id}"
  width="384"
  height="324"
></iframe>`;

  return (
    <Dialog open={isModalOpen(ModalId.EMBED_MARKET)} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Embed Market</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-6 px-6 pb-8">
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
            <EmbedMarketCard fixedProductMarketMaker={fixedProductMarketMaker} />
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
