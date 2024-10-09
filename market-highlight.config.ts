// Example market highlight definition
//
// Image should be stored inside public/assets/highlights
// import kamalaTrump from '@/public/assets/highlights/kamala-trump.png';
//
// ['0x0539590c0cf0d929e3f40b290fda04b9b4a8cf68']: { image: kamalaTrump }

import kamalaTrump from '@/public/assets/highlights/kamala-trump.png';
import { StaticImageData } from 'next/image';

const highlightedMarketsList: Record<string, { image: StaticImageData }> = {
  ['0x8943a769cb0503f7bc4e92a777fcd1aa9decfc33']: {
    image: kamalaTrump,
  },
  ['0x0539590c0cf0d929e3f40b290fda04b9b4a8cf68']: { image: kamalaTrump },
};

export { highlightedMarketsList };
