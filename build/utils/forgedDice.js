"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resistanceRoll = exports.actionRoll = void 0;
const rollDice_1 = __importDefault(require("./rollDice"));
const checkCrit = (rolls) => {
    let sixes = 0;
    rolls.forEach((roll) => {
        if (roll === 6)
            sixes++;
    });
    return { isCrit: sixes >= 2, sixes };
};
const actionRoll = (pool) => {
    let dice = (0, rollDice_1.default)(pool, 6);
    let { isCrit, sixes } = checkCrit(dice.rolls);
    let response = { text: '', status: '' };
    if (isCrit) {
        response.text = `Critical success! Got **${sixes} sixes** on ${pool}d (${dice.rolls.join(', ')}). Your action has **increased effect.**`;
        response.status = 'crit';
    }
    else {
        switch (dice.max) {
            case 6:
                response.text = `Full success`;
                response.status = 'full';
                break;
            case 5:
            case 4:
                response.text = `Mixed success`;
                response.status = 'mixed';
                break;
            case 3:
            case 2:
            case 1:
                response.text = `Failure`;
                response.status = 'fail';
        }
        response.text += `! Got **${dice.max}** on ${pool}d (${dice.rolls.join(', ')}).`;
    }
    return response;
};
exports.actionRoll = actionRoll;
const resistanceRoll = (pool) => {
    let dice = (0, rollDice_1.default)(pool, 6);
    let response = { text: '', status: '' };
    let { isCrit, sixes } = checkCrit(dice.rolls);
    if (isCrit) {
        response.text += `Critical success! **Clear 1 stress.** (Got **${sixes}** sixes on the following rolls: ${dice.rolls.join(', ')}).`;
        response.status += 'crit';
    }
    else {
        response.text += `Take **${6 - dice.max}** stress to resist (6 minus your maximum of **${dice.max}** on the following rolls: ${dice.rolls.join(', ')}).`;
        response.status = dice.max === 6 ? 'full' : 'mixed';
    }
    return response;
};
exports.resistanceRoll = resistanceRoll;
