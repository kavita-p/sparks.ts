"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.falloutTest = exports.skillCheck = void 0;
const lib_1 = require("../utils/lib");
const skillCheck = (rolls, zeroD) => {
    let score = rolls.max;
    const status = zeroD
        ? lib_1.RollStatus.Mixed
        : score == 10
            ? lib_1.RollStatus.Crit
            : score >= 8
                ? lib_1.RollStatus.Full
                : score >= 6
                    ? lib_1.RollStatus.Mixed
                    : lib_1.RollStatus.Failure;
    const title = zeroD
        ? `Rolled ${rolls.max} on ${rolls.dice.length}d10.`
        : rolls.max === 1
            ? "Critical failure!"
            : (() => {
                switch (status) {
                    case lib_1.RollStatus.Crit:
                        return "Critical success!";
                    case lib_1.RollStatus.Full:
                        return "Clean success!";
                    case lib_1.RollStatus.Mixed:
                        return "Success!";
                    case lib_1.RollStatus.Failure:
                        return "Failure!";
                    default:
                        throw new lib_1.UnreachableCaseError(status);
                }
            })();
    const description = zeroD
        ? "Each Sparked by Resistance system handles its rolls differently. You should consult the rules for your particular game to interpret these results. You can use `/roll custom` if you need additional dice."
        : `Rolled ${rolls.max} on ${rolls.dice.length}d10.`;
    return {
        title,
        description,
        status,
        dice: rolls.dice,
    };
};
exports.skillCheck = skillCheck;
const falloutTest = (rolls) => {
    return {
        title: `Rolled ${rolls.max} to test for fallout.`,
        description: `Take **${rolls.max > 6 ? "major" : "minor"}** fallout if this roll is **lower** than your total stress.`,
        status: rolls.max > 6 ? lib_1.RollStatus.Failure : lib_1.RollStatus.Mixed,
        dice: rolls.dice,
    };
};
exports.falloutTest = falloutTest;
