"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pbtaMove = void 0;
const lib_1 = require("../utils/lib");
const pbtaMove = (rolls, stat) => {
    //this reduce is a fancy sum function
    //since javascript and typescript don't have one built-in
    const score = rolls.dice.reduce((run, now) => run + now) + stat;
    const status = score >= 12
        ? lib_1.RollStatus.Crit
        : score >= 10
            ? lib_1.RollStatus.Full
            : score >= 7
                ? lib_1.RollStatus.Mixed
                : lib_1.RollStatus.Failure;
    const title = (() => {
        switch (status) {
            case lib_1.RollStatus.Crit:
                return "Full success!";
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
    const description = ` Got **${score}** on 2d6${stat > 0 ? ` + ${stat}` : stat < 0 ? ` - ${Math.abs(stat)}` : ""}.${score >= 12
        ? "\n\nYou also gain any bonuses that trigger on a **12+** for this move, if applicable."
        : ""}`;
    return {
        title,
        description,
        status,
        dice: rolls.dice,
    };
};
exports.pbtaMove = pbtaMove;
