'use client';

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  IconButton,
} from '@swapr/ui';
import { ModalId, useModal } from '@/context/ModalContext';
import { APP_URL } from '@/constants';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { EmbedMarketCard } from '@/app/components/EmbedMarketCard';
import { useState } from 'react';
interface EmbedMarketModalProps {
  id: string;
  fixedProductMarketMaker: any;
}

export const EmbedMarketModal = ({
  id,
  fixedProductMarketMaker,
}: EmbedMarketModalProps) => {
  const { isModalOpen, closeModal } = useModal();
  const [clipboardIcon, setClipboardIcon] = useState<'copy' | 'tick'>('copy');

  const close = () => {
    closeModal(ModalId.EMBED_MARKET);
  };

  const embedUrl = `${APP_URL}/embed/market?id=${id}`;

  const iframeCode = `<iframe
  title="presagio-market-iframe"
  src="${embedUrl}"
  width="384"
  height="222"
></iframe>`;

  return (
    <Dialog open={isModalOpen(ModalId.EMBED_MARKET)} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Embed Market</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-6 px-6 pb-8">
          <div className="space-y-4">
            <h3 className="font-bold">Embed Code</h3>
            <div className="relative">
              <div className="absolute right-2 top-2 z-10">
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(iframeCode);
                    setClipboardIcon('tick');

                    setTimeout(() => {
                      setClipboardIcon('copy');
                    }, 3000);
                  }}
                  variant="pastel"
                  name={clipboardIcon}
                  size="sm"
                />
              </div>
              <SyntaxHighlighter
                language="html"
                style={atomDark}
                customStyle={{ borderRadius: '16px' }}
              >
                {iframeCode}
              </SyntaxHighlighter>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold">Preview</h3>
            <EmbedMarketCard fixedProductMarketMaker={fixedProductMarketMaker} />
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
