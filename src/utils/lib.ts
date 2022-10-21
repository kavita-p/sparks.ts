export enum RollStatus {
  Crit,
  Full,
  Mixed,
  Failure,
}

export enum ForgedType {
  Action = "action",
  Resist = "resist",
  Fortune = "fortune",
  Clear = "clear",
}

export enum WildType {
  Action = "action",
  Attack = "attack",
  Defense = "defense",
  Acquisition = "acquisition",
  Creation = "creation",
  Recovery = "recovery",
  Ratings = "ratings",
  Watch = "watch",
  Weather = "weather"
}

export interface RollResponse {
  title: string;
  description: string;
  dice: number[];
  status: RollStatus;
}

export class Rolls {
  max = 0;
  min = 0;
  dice: number[] = [];
}

export class UnreachableCaseError extends Error {
  constructor(val: never) {
    super(`Unreachable case: ${val}`);
  }
}

export const rollDice = (count: number, sides: number): Rolls => {
  const dice: number[] = [];
  for (let i = 0; i < count; i++) {
    dice.push(Math.floor(sides * Math.random() + 1));
  }

  return {
    max: Math.max(...dice),
    min: Math.min(...dice),
    dice,
  };
};
