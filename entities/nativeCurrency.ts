import { BaseCurrency } from "./baseCurrency";

/**
 * Represents the native currency of the chain on which it resides, e.g.
 *
 * Based on Uniswap/sdk-core.
 * https://github.com/Uniswap/sdk-core/blob/main/src/entities/nativeCurrency.ts
 */
export abstract class NativeCurrency extends BaseCurrency {
  public readonly isNative: true = true;
  public readonly isToken: false = false;
}
