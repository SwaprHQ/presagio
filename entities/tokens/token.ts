import { Address, isAddress } from 'viem';
import { BaseCurrency } from './baseCurrency';
import { Currency } from './currency';

/**
 * Represents an ERC20 token with a unique address and some metadata.
 *
 * Based on Uniswap/sdk-core.
 * https://github.com/Uniswap/sdk-core/blob/main/src/entities/token.ts
 */
export class Token extends BaseCurrency {
  public readonly isNative: false = false;
  public readonly isToken: true = true;

  /**
   * The contract address on the chain on which this token lives
   */
  public readonly address: Address;

  /**
   *
   * @param chainId {@link BaseCurrency#chainId}
   * @param address The contract address on the chain on which this token lives
   * @param decimals {@link BaseCurrency#decimals}
   * @param symbol {@link BaseCurrency#symbol}
   * @param name {@link BaseCurrency#name}
   */
  public constructor(
    chainId: number,
    address: Address,
    decimals: number,
    symbol: string,
    name: string
  ) {
    super(chainId, decimals, symbol, name);

    if (isAddress(address)) this.address = address;
    else throw new Error('Token address not valid');
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Currency): boolean {
    return (
      other.isToken &&
      this.chainId === other.chainId &&
      this.address.toLowerCase() === other.address.toLowerCase()
    );
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    if (this.chainId !== other.chainId) {
      throw new Error('Tokens have different chain IDs');
    }
    if (this.address.toLowerCase() === other.address.toLowerCase()) {
      throw new Error('Tokens are equal');
    }

    return this.address.toLowerCase() < other.address.toLowerCase();
  }

  /**
   * Return this token, which does not need to be wrapped
   */
  public get wrapped(): Token {
    return this;
  }
}
