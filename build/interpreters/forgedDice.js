"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgedDice = void 0;
const lib_1 = require("../utils/lib");
const forgedDice = (rolls, rollType, zeroD) => {
    const sixes = rolls.dice.filter((d) => d === 6).length;
    const pool = zeroD ? 0 : rolls.dice.length;
    const score = zeroD ? rolls.min : rolls.max;
    const fortuneTicks = {
        [lib_1.RollStatus.Crit]: 5,
        [lib_1.RollStatus.Full]: 3,
        [lib_1.RollStatus.Mixed]: 2,
        [lib_1.RollStatus.Failure]: 1,
    };
    const status = sixes > 1
        ? rollType !== lib_1.ForgedType.Clear
            ? lib_1.RollStatus.Crit
            : lib_1.RollStatus.Full
        : (() => {
            return score > 5
                ? lib_1.RollStatus.Full
                : score > 3
                    ? lib_1.RollStatus.Mixed
                    : lib_1.RollStatus.Failure;
        })();
    const title = (() => {
        switch (rollType) {
            case lib_1.ForgedType.Action:
                return (() => {
                    switch (status) {
                        case lib_1.RollStatus.Crit:
                            return "Critical success!";
                        case lib_1.RollStatus.Full:
                            return "Full success!";
                        case lib_1.RollStatus.Mixed:
                            return "Mixed success!";
                        case lib_1.RollStatus.Failure:
                            return "Failure!";
                        default:
                            throw new lib_1.UnreachableCaseError(status);
                    }
                })();
            case lib_1.ForgedType.Resist:
                return status === lib_1.RollStatus.Crit
                    ? "Clear 1 stress!"
                    : `Take ${6 - score} stress to resist.`;
            case lib_1.ForgedType.Fortune:
                return (() => {
                    switch (status) {
                        case lib_1.RollStatus.Crit:
                            return "Critical!";
                        case lib_1.RollStatus.Full:
                            return "Increased effect!";
                        case lib_1.RollStatus.Mixed:
                            return "Standard effect!";
                        case lib_1.RollStatus.Failure:
                            return "Reduced effect.";
                    }
                })();
            case lib_1.ForgedType.Clear:
                return `Clear ${score} stress.`;
        }
    })();
    const description = sixes > 1
        ? (() => {
            switch (rollType) {
                case lib_1.ForgedType.Action:
                    return `Got **${sixes} sixes** on ${pool}d. Your action has **increased effect.**`;
                case lib_1.ForgedType.Resist:
                    return `Rolled a **critical** to resist. (Got **${sixes}** sixes.)`;
                case lib_1.ForgedType.Fortune:
                    return `Extreme effect, or **5 ticks** on the relevant clock. Got **${sixes} sixes** on ${pool}d.`;
                case lib_1.ForgedType.Clear:
                    return "If this is more stress than you currently have, you **overindulge**.";
                default:
                    throw new lib_1.UnreachableCaseError(rollType);
            }
        })()
        : (() => {
            switch (rollType) {
                case lib_1.ForgedType.Action:
                    return `Got **${score}** on ${pool}d${zeroD ? " (rolled as the lowest of 2d)" : ""}.`;
                case lib_1.ForgedType.Resist:
                    return `6 minus your score of **${score}** on **${pool}d**${zeroD ? " (rolled as the lowest of 2d)" : ""}.`;
                case lib_1.ForgedType.Fortune:
                    return `**${fortuneTicks[status]} tick${fortuneTicks[status] !== 1 ? "s" : ""}** on the relevant clock. Got **${score}** on ${pool}d${zeroD ? " (rolled as the lowest of 2d)" : ""}.`;
                case lib_1.ForgedType.Clear:
                    return `${zeroD ? "(Rolled as the lowest of 2d.)\n\n" : ""}If this is more stress than you currently have, you **overindulge**.`;
                default:
                    throw new lib_1.UnreachableCaseError(rollType);
            }
        })();
    return {
        title,
        description,
        status,
        dice: rolls.dice,
    };
};
exports.forgedDice = forgedDice;
