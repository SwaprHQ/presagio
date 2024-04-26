import { Position } from "@/queries/conditional-tokens/types";

export class PositionModel {
  conditionId: string;
  outcomeIndex: number;
  outcomes?: string[] | null;

  constructor(position: Position) {
    this.conditionId = position.conditionIdsStr;
    this.outcomeIndex = position.indexSets[0];
    this.outcomes = position.conditions?.[0]?.outcomes;
  }

  outcomeString(): string | null {
    return this.outcomes ? this.outcomes[this.outcomeIndex - 1] : null;
  }
}
