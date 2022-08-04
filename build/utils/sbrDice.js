"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.falloutTest = exports.skillCheck = void 0;
const rollDice_1 = __importDefault(require("./rollDice"));
const skillCheck = (pool) => {
    let dice = (0, rollDice_1.default)(pool, 10);
    let response = { text: '', status: '' };
    switch (dice.max) {
        case 10:
            response.text += `Critical success!`;
            response.status = 'crit';
            break;
        case 9:
        case 8:
            response.text += `Clean success!`;
            response.status = 'full';
            break;
        case 7:
        case 6:
            response.text += `Strained success!`;
            response.status = 'mixed';
            break;
        case 5:
        case 4:
        case 3:
        case 2:
            response.text += `Failure...`;
            response.status = 'fail';
            break;
        case 1:
            response.text += `Critical failure!`;
            response.status = 'critfail';
    }
    response.text += ` Rolled **${dice.max}** on ${pool}d10 (${dice.rolls.join(', ')}).`;
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
