"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pbtaRoll = void 0;
const rollDice_1 = __importDefault(require("./rollDice"));
const response_1 = __importDefault(require("./response"));
const pbtaRoll = (stat) => {
    let dice = (0, rollDice_1.default)(2, 6);
    let score = dice.rolls[0] + dice.rolls[1] + stat;
    let response = new response_1.default();
    if (score >= 12) {
        response.title = "Full success!";
        response.status = "crit";
    }
    else if (score >= 10) {
        response.title = "Full success!";
        response.status = "full";
    }
    else if (score >= 7) {
        response.title = "Mixed success!";
        response.status = "mixed";
    }
    else {
        response.title = "Failure!";
        response.status = "fail";
    }
    response.description = ` Got **${score}** on 2d6${stat > 0 ? ` + ${stat}` : stat < 0 ? ` - ${Math.abs(stat)}` : ""}.`;
    if (score >= 12) {
        response.description +=
            "\n\nYou also gain any bonuses that trigger on a **12+** for this move, if applicable.";
    }
    response.dice = dice.rolls;
    return response;
};
exports.pbtaRoll = pbtaRoll;
