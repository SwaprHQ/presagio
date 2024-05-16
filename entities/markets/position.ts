import { Position as ConditionalTokenPosition } from "@/queries/conditional-tokens/types";

export class Position {
  conditionId: string;
  outcomeIndex: number;
  outcomes?: string[] | null;

  constructor(position: ConditionalTokenPosition) {
    this.conditionId = position.conditionIdsStr;
    this.outcomeIndex = position.indexSets[0];
    this.outcomes = position.conditions?.[0]?.outcomes;
  }

  getOutcome(): string {
    return this.outcomes ? this.outcomes[this.outcomeIndex - 1] : "";
  }
}
