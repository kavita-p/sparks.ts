"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.falloutTest = exports.skillCheck = void 0;
const rollDice_1 = __importDefault(require("./rollDice"));
const skillCheck = (pool) => {
    let zeroDice;
    if (pool <= 0) {
        pool = 1;
        zeroDice = true;
    }
    let dice = (0, rollDice_1.default)(pool, 10);
    let response = { text: '', status: '' };
    let successTable = [
        { text: 'Critical success', status: 'crit' },
        { text: 'Clean success', status: 'full' },
        { text: 'Strained success', status: 'mixed' },
        { text: 'Failure', status: 'fail' },
        { text: 'Critical failure', status: 'critfail' },
    ];
    let i;
    switch (dice.max) {
        case 10:
            i = 0;
            break;
        case 9:
        case 8:
            i = 1;
            break;
        case 7:
        case 6:
            i = 2;
            break;
        case 5:
        case 4:
        case 3:
        case 2:
            i = 3;
            break;
        case 1:
            i = 4;
    }
    if (zeroDice) {
        if (i === 4) {
            response.text = `Critical failure! Rolled **${dice.max}** on 0d (1d with an alternate success table.)`;
            response.status = 'critfail';
        }
        else {
            response.text = `You've asked for a 0d roll! To resolve this, a special success table is applied to a roll of **1d**, on which you got a **${dice.max}**. If you're playing *Spire: The City Must Fall* your **${successTable[i].text.toLowerCase()}** is reduced to a **${successTable[i + 1].text.toLowerCase()}**. In most other SbR systems, your **${dice.max}** counts as a **${dice.max === 10 ? 'strained success' : 'failure'}**.`;
        }
    }
    else {
        response = successTable[i];
        response.text += `! Rolled **${dice.max}** on ${pool}d10 (${dice.rolls.join(', ')}).`;
    }
    return response;
};
exports.skillCheck = skillCheck;
const falloutTest = () => {
    let die = (0, rollDice_1.default)(1, 12);
    let response = { text: '', status: '' };
    response.text = `Test against **${die.max}**! Take ${die.max > 6 ? 'major' : 'minor'} fallout if this roll is **lower** than your total stress.`;
    response.status = die.max > 6 ? 'mixed' : 'fail';
    return response;
};
exports.falloutTest = falloutTest;
