const CHARACTERS_LIMIT = 15;

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
   * The truncated name
   */
  public readonly symbol: string;

  /**
   * The market which the outcome belongs
   */
  public readonly marketId: string;

  /**
   * The minted percentage on this outcome
   */
  public readonly percentage: string | null;

  /**
   * Constructs an instance of Outcome.
   * @param index of the outcome
   * @param name of the outcome
   */
  public constructor(
    index: number,
    name: string,
    marketId: string,
    percentage?: string
  ) {
    this.index = index;
    this.name = name;
    this.symbol =
      name.length > CHARACTERS_LIMIT
        ? name.substring(0, CHARACTERS_LIMIT) + "..."
        : name;
    this.marketId = marketId;
    this.percentage = percentage ? (+percentage * 100).toFixed(2) : null;
  }

  /**
   * Returns true if the two outcomes are equivalent.
   * @param other other outcome to compare
   */
  public equals(other: Outcome): boolean {
    return this.index === other.index && this.marketId === other.marketId;
  }
}
