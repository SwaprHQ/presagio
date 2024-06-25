import { NativeCurrency } from './nativeCurrency';
import { Token } from './token';

/**
 * Based on Uniswap/sdk-core.
 * https://github.com/Uniswap/sdk-core/blob/main/src/entities/currency.ts
 */
export type Currency = NativeCurrency | Token;
