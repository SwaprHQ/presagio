// Example market highlight definition
//
// Image should be stored inside public/assets/highlights
// import kamalaTrump from '@/public/assets/highlights/kamala-trump.png';
//
// '0x0539590c0cf0d929e3f40b290fda04b9b4a8cf68': { image: kamalaTrump }

import { StaticImageData } from 'next/image';
import novak from '@/public/assets/highlights/novak.webp';

const highlightedMarketsList: Record<string, { image: StaticImageData }> = {
  '0xb6b152bc87436f36fc37652c27901bcd32844589': { image: novak },
};

export { highlightedMarketsList };
