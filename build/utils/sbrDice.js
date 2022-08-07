"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.falloutTest = exports.skillCheck = void 0;
const rollDice_1 = __importDefault(require("./rollDice"));
const skillCheck = (pool) => {
    let zeroDice = false;
    if (pool <= 0) {
        pool = 1;
        zeroDice = true;
    }
    let dice = (0, rollDice_1.default)(pool, 10);
    let response = { title: '', description: '', dice: '', status: '' };
    let successTable = [
        { title: 'Critical success', status: 'crit' },
        { title: 'Clean success', status: 'full' },
        { title: 'Strained success', status: 'mixed' },
        { title: 'Failure', status: 'fail' },
        { title: 'Critical failure', status: 'critfail' },
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
            response.title = 'Critical failure!';
            response.description = `Rolled **${dice.max}** on 0d (1d with an alternate success table.)`;
            response.dice = '1';
            response.status = 'critfail';
        }
        else {
            response.title = dice.max.toString();
            response.description = `You've asked for a 0d roll! To resolve this, a special success table is applied to a roll of **1d**, on which you got a **${dice.max}**. If you're playing *Spire: The City Must Fall* your **${successTable[i].title.toLowerCase()}** is reduced to a **${successTable[i + 1].title.toLowerCase()}**. In most other SbR systems, your **${dice.max}** counts as a **${dice.max === 10 ? 'strained success' : 'failure'}**.`;
            response.dice = dice.max.toString();
            response.status = 'fail';
        }
    }
    else {
        response.title = `${successTable[i].title}!`;
        response.description = `Rolled **${dice.max}** on ${pool}d10.`;
        response.dice = dice.rolls.join(', ');
        response.status = successTable[i].status;
    }
    return response;
};
exports.skillCheck = skillCheck;
const falloutTest = () => {
    let die = (0, rollDice_1.default)(1, 12);
    let response = {
        title: 'Fallout test',
        description: '',
        dice: '',
        status: '',
    };
    response.description = `Test against **${die.max}**! Take ${die.max > 6 ? 'major' : 'minor'} fallout if this roll is **lower** than your total stress.`;
    response.status = die.max > 6 ? 'mixed' : 'fail';
    return response;
};
exports.falloutTest = falloutTest;
