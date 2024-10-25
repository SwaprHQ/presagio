'use client';

import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@swapr/ui';
import { FA_EVENTS } from '@/analytics';
import { ModalId, useModal } from '@/context/ModalContext';
import { APP_URL } from '@/constants';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useMemo, useState } from 'react';
import { cx } from 'class-variance-authority';
import { trackEvent } from 'fathom-client';
import { isMobile } from 'react-device-detect';
import { Address } from 'viem';

const lightTheme = {
  name: 'Light',
  value: 'light',
};

const darkTheme = {
  name: 'Dark',
  value: 'dark',
};

const systemTheme = {
  name: 'System',
  value: 'system',
};

export const themeFilters = [systemTheme, lightTheme, darkTheme];

interface EmbedMarketModalProps {
  id: Address;
}

export const EmbedMarketModal = ({ id }: EmbedMarketModalProps) => {
  const { isModalOpen, closeModal } = useModal();
  const [isThemePopoverOpen, setThemePopoverOpen] = useState(false);
  const [selectedTheme, setSelectTheme] = useState(systemTheme);
  const [clipboardIcon, setClipboardIcon] = useState<'copy' | 'tick'>('copy');

  const close = () => {
    closeModal(ModalId.EMBED_MARKET);
  };

  const IFRAME_WIDTH = 384;
  const IFRAME_HEIGHT = 222;

  const embedUrl = useMemo(
    () => `${APP_URL}/embed/market?id=${id}&theme=${selectedTheme.value}`,
    [id, selectedTheme.value]
  );

  const getIframeCode = (
    url: string,
    width: number = IFRAME_WIDTH,
    height: number = IFRAME_HEIGHT
  ) =>
    `<iframe
  title="presagio-market-iframe"
  src="${url}"
  width="${width}"
  height="${height}" 
/>`;

  const iframeCode = useMemo(
    () => getIframeCode(embedUrl, IFRAME_WIDTH, IFRAME_HEIGHT),
    [embedUrl]
  );

  const iFrameCodeRendered = useMemo(() => {
    const width = isMobile ? 325 : IFRAME_WIDTH;

    return (
      <div
        dangerouslySetInnerHTML={{
          __html: getIframeCode(embedUrl, width, IFRAME_HEIGHT),
        }}
      />
    );
  }, [embedUrl]);

  return (
    <Dialog open={isModalOpen(ModalId.EMBED_MARKET)} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Embed Market</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-6 pb-8">
          <div className="space-y-4">
            <h3 className="font-bold">Embed Code</h3>
            <div className="relative">
              <div className="absolute right-2 top-2 z-10">
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(iframeCode);
                    setClipboardIcon('tick');
                    trackEvent(FA_EVENTS.MARKETS.DETAILS.EMBED.COPIED(id));

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
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Preview</h3>
              <div className="flex items-center space-x-2">
                <p>Select theme:</p>
                <div className="w-28">
                  <Popover open={isThemePopoverOpen} onOpenChange={setThemePopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="pastel"
                        className="w-full justify-between text-nowrap"
                      >
                        <p>{selectedTheme.name}</p>
                        <Icon name="chevron-down" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="px-1 py-2">
                      {themeFilters.map(option => (
                        <div
                          key={option.name}
                          onClick={() => setSelectTheme(option)}
                          className="flex cursor-pointer items-center justify-start space-x-2 px-3 py-2 font-semibold"
                        >
                          <Icon
                            className={cx({
                              invisible: selectedTheme.value !== option.value,
                            })}
                            name="tick-fill"
                          />
                          <p>{option.name}</p>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            <div className="flex h-72 w-full flex-col items-center justify-center rounded-12 bg-surface-surface-1 p-2">
              <div style={{ colorScheme: 'system' }}>{iFrameCodeRendered}</div>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
