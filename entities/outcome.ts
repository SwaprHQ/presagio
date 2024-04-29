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
   * Constructs an instance of Outcome.
   * @param index of the outcome
   * @param name of the outcome
   */
  public constructor(index: number, name: string) {
    this.index = index;
    this.name = name;
  }
}
