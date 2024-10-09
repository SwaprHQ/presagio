// Example market highlight definition
//
// Image should be stored inside public/assets/highlights
// import kamalaTrump from '@/public/assets/highlights/kamala-trump.png';
//
// '0x0539590c0cf0d929e3f40b290fda04b9b4a8cf68': { image: kamalaTrump }

import { StaticImageData } from 'next/image';

const highlightedMarketsList: Record<string, { image: StaticImageData }> = {};

export { highlightedMarketsList };
