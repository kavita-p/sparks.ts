"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnreachableCaseError = exports.Rolls = exports.ForgedType = exports.RollStatus = void 0;
var RollStatus;
(function (RollStatus) {
    RollStatus[RollStatus["Crit"] = 0] = "Crit";
    RollStatus[RollStatus["Full"] = 1] = "Full";
    RollStatus[RollStatus["Mixed"] = 2] = "Mixed";
    RollStatus[RollStatus["Failure"] = 3] = "Failure";
})(RollStatus = exports.RollStatus || (exports.RollStatus = {}));
var ForgedType;
(function (ForgedType) {
    ForgedType[ForgedType["Action"] = 0] = "Action";
    ForgedType[ForgedType["Resist"] = 1] = "Resist";
    ForgedType[ForgedType["Fortune"] = 2] = "Fortune";
    ForgedType[ForgedType["Clear"] = 3] = "Clear";
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
