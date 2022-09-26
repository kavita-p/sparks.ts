import {
  RollResponse,
  Rolls,
  ForgedType,
  RollStatus,
  UnreachableCaseError,
} from "../utils/lib";

export const forgedDice = (
  rolls: Rolls,
  rollType: ForgedType,
  zeroD: boolean
): RollResponse => {
  const sixes = rolls.dice.filter((d) => d === 6).length;
  const pool = zeroD ? 0 : rolls.dice.length;
  const score = zeroD ? rolls.min : rolls.max;

  const fortuneTicks = {
    [RollStatus.Crit]: 5,
    [RollStatus.Full]: 3,
    [RollStatus.Mixed]: 2,
    [RollStatus.Failure]: 1,
  };

  const status: RollStatus =
    sixes > 1
      ? rollType !== ForgedType.Clear
        ? RollStatus.Crit
        : RollStatus.Full
      : (() => {
          return score > 5
            ? RollStatus.Full
            : score > 3
            ? RollStatus.Mixed
            : RollStatus.Failure;
        })();

  const title = (() => {
    switch (rollType) {
      case ForgedType.Action:
        return (() => {
          switch (status) {
            case RollStatus.Crit:
              return "Critical success!";
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
      case ForgedType.Resist:
        return status === RollStatus.Crit
          ? "Clear 1 stress!"
          : `Take ${6 - score} stress to resist.`;
      case ForgedType.Fortune:
        return (() => {
          switch (status) {
            case RollStatus.Crit:
              return "Critical!";
            case RollStatus.Full:
              return "Increased effect!";
            case RollStatus.Mixed:
              return "Standard effect!";
            case RollStatus.Failure:
              return "Reduced effect.";
          }
        })();
      case ForgedType.Clear:
        return `Clear ${score} stress.`;
    }
  })();

  const description =
    sixes > 1
      ? (() => {
          switch (rollType) {
            case ForgedType.Action:
              return `Got **${sixes} sixes** on ${pool}d. Your action has **increased effect.**`;
            case ForgedType.Resist:
              return `Rolled a **critical** to resist. (Got **${sixes}** sixes.)`;
            case ForgedType.Fortune:
              return `Extreme effect, or **5 ticks** on the relevant clock. Got **${sixes} sixes** on ${pool}d.`;
            case ForgedType.Clear:
              return "If this is more stress than you currently have, you **overindulge**.";
            default:
              throw new UnreachableCaseError(rollType);
          }
        })()
      : (() => {
          switch (rollType) {
            case ForgedType.Action:
              return `Got **${score}** on ${pool}d${
                zeroD ? " (rolled as the lowest of 2d)" : ""
              }.`;
            case ForgedType.Resist:
              return `6 minus your score of **${score}** on **${pool}d**${
                zeroD ? " (rolled as the lowest of 2d)" : ""
              }.`;
            case ForgedType.Fortune:
              return `**${fortuneTicks[status]} tick${
                fortuneTicks[status] !== 1 ? "s" : ""
              }** on the relevant clock. Got **${score}** on ${pool}d${
                zeroD ? " (rolled as the lowest of 2d)" : ""
              }.`;
            case ForgedType.Clear:
              return `${
                zeroD ? "(Rolled as the lowest of 2d.)\n\n" : ""
              }If this is more stress than you currently have, you **overindulge**.`;
            default:
              throw new UnreachableCaseError(rollType);
          }
        })();

  return {
    title,
    description,
    status,
    dice: rolls.dice,
  };
};
