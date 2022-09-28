import {
  RollResponse,
  Rolls,
  RollStatus,
  UnreachableCaseError,
} from "../utils/lib";

export const skillCheck = (rolls: Rolls, zeroD: boolean): RollResponse => {
  const score = rolls.max;

  const status = zeroD
    ? RollStatus.Mixed
    : score == 10
    ? RollStatus.Crit
    : score >= 8
    ? RollStatus.Full
    : score >= 6
    ? RollStatus.Mixed
    : RollStatus.Failure;

  const title = zeroD
    ? `Got ${rolls.max} on 0d10 (rolled as ${rolls.dice.length}d10.)`
    : rolls.max === 1
    ? "Critical failure!"
    : (() => {
        switch (status) {
          case RollStatus.Crit:
            return "Critical success!";
          case RollStatus.Full:
            return "Clean success!";
          case RollStatus.Mixed:
            return "Success!";
          case RollStatus.Failure:
            return "Failure!";
          default:
            throw new UnreachableCaseError(status);
        }
      })();

  const description = zeroD
    ? "You've asked for a 0d roll! Each Sparked by Resistance system handles these rolls differently. You should consult the rules for your particular game to interpret these results. You can use `/roll custom` if you need additional dice."
    : `Rolled ${rolls.max} on ${rolls.dice.length}d10.`;

  return {
    title,
    description,
    status,
    dice: rolls.dice,
  };
};

export const falloutTest = (rolls: Rolls) => {
  return {
    title: `Rolled ${rolls.max} to test for fallout.`,
    description: `Take **${
      rolls.max > 6 ? "major" : "minor"
    }** fallout if this roll is **lower** than your total stress.`,
    status: rolls.max > 6 ? RollStatus.Failure : RollStatus.Mixed,
    dice: rolls.dice,
  };
};
