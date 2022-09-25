"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = rollDice;
