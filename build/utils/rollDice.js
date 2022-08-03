"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rollDice = (count, sides) => {
    let results = { max: 0, rolls: [], min: 0 };
    for (let i = 0; i < count; i++) {
        results.rolls.push(Math.floor(sides * Math.random() + 1));
    }
    results.max = Math.max(...results.rolls);
    results.min = Math.min(...results.rolls);
    return results;
};
exports.default = rollDice;
