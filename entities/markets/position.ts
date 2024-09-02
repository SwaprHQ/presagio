import {
  Condition,
  Position as ConditionalTokenPosition,
} from '@/queries/conditional-tokens/types';

export class Position {
  id: string;
  conditionId: string;
  outcomeIndex: number;
  outcomes?: string[] | null;
  condition: Condition;

  constructor(position: ConditionalTokenPosition) {
    this.id = position.id;
    this.conditionId = position.conditionIdsStr;
    this.outcomeIndex = position.indexSets[0];
    this.outcomes = position.conditions?.[0]?.outcomes;
    this.condition = position.conditions?.[0];
  }

  getOutcome(): string {
    return this.outcomes ? this.outcomes[this.outcomeIndex - 1] : '';
  }

  getOutcomeIndex(): number {
    return this.outcomeIndex - 1;
  }
}
