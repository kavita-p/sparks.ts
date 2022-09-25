"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customRoll = void 0;
const lib_1 = require("../utils/lib");
const customRoll = (rolls, count, sides) => {
    return {
        title: `${rolls.max}`,
        description: `Rolled ${count}d${sides} (max: ${rolls.max}, min: ${rolls.min}).`,
        status: lib_1.RollStatus.Full,
        dice: rolls.dice,
    };
};
exports.customRoll = customRoll;
