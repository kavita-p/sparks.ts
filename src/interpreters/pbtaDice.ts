import {
  RollResponse,
  Rolls,
  RollStatus,
  UnreachableCaseError,
} from "../utils/lib";

export const pbtaMove = (rolls: Rolls, stat: number): RollResponse => {
  //this reduce is a fancy sum function
  //since javascript and typescript don't have one built-in
  const score = rolls.dice.reduce((run, now) => run + now) + stat;

  const status =
    score >= 12
      ? RollStatus.Crit
      : score >= 10
      ? RollStatus.Full
      : score >= 7
      ? RollStatus.Mixed
      : RollStatus.Failure;

  const title = (() => {
    switch (status) {
      case RollStatus.Crit:
        return "Full success!";
      case RollStatus.Full:
        return "Full success!";
      case RollStatus.Mixed:
        return "Mixed success!";
      case RollStatus.Failure:
        return "Failure!";
      default:
        throw new UnreachableCaseError(status);
    }
  })();

  const description = `Got **${score}** on 2d6${
    stat > 0 ? ` + ${stat}` : stat < 0 ? ` - ${Math.abs(stat)}` : ""
  }.${
    score >= 12
      ? "\n\nYou also gain any bonuses that trigger on a **12+** for this move, if applicable."
      : ""
  }`;

  return {
    title,
    description,
    status,
    dice: rolls.dice,
  };
};
