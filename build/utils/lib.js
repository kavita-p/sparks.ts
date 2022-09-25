"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollDice = exports.UnreachableCaseError = exports.Rolls = exports.ForgedType = exports.RollStatus = void 0;
var RollStatus;
(function (RollStatus) {
    RollStatus[RollStatus["Crit"] = 0] = "Crit";
    RollStatus[RollStatus["Full"] = 1] = "Full";
    RollStatus[RollStatus["Mixed"] = 2] = "Mixed";
    RollStatus[RollStatus["Failure"] = 3] = "Failure";
})(RollStatus = exports.RollStatus || (exports.RollStatus = {}));
var ForgedType;
(function (ForgedType) {
    ForgedType["Action"] = "action";
    ForgedType["Resist"] = "resist";
    ForgedType["Fortune"] = "fortune";
    ForgedType["Clear"] = "clear";
})(ForgedType = exports.ForgedType || (exports.ForgedType = {}));
class Rolls {
    constructor() {
        this.max = 0;
        this.min = 0;
        this.dice = [];
    }
}
exports.Rolls = Rolls;
class UnreachableCaseError extends Error {
    constructor(val) {
        super(`Unreachable case: ${val}`);
    }
}
exports.UnreachableCaseError = UnreachableCaseError;
const rollDice = (count, sides) => {
    const dice = [];
    for (let i = 0; i < count; i++) {
        dice.push(Math.floor(sides * Math.random() + 1));
    }
    return {
        max: Math.max(...dice),
        min: Math.min(...dice),
        dice,
    };
};
exports.rollDice = rollDice;
