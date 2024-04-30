export class Outcome {
  /**
   * The index of the outcome
   */
  public readonly index: number;

  /**
   * The name of the outcome
   */
  public readonly name: string;

  /**
   * The name alias
   */
  public readonly symbol: string;

  /**
   * The market which the outcome belongs
   */
  public readonly marketId: string;

  /**
   * Constructs an instance of Outcome.
   * @param index of the outcome
   * @param name of the outcome
   */
  public constructor(index: number, name: string, marketId: string) {
    this.index = index;
    this.name = name;
    this.symbol = name;
    this.marketId = marketId;
  }

  /**
   * Returns true if the two outcomes are equivalent.
   * @param other other outcome to compare
   */
  public equals(other: Outcome): boolean {
    return this.index === other.index && this.marketId === other.marketId;
  }
}
