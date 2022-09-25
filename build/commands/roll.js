"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
//builders
const discord_js_1 = require("discord.js");
const response_1 = require("../utils/response");
//various dice-based roll utilities
const rollDice_1 = require("../utils/rollDice");
const sbrDice_1 = require("../utils/sbrDice");
const forgedDice_1 = require("../utils/forgedDice");
const pbtaDice_1 = require("../utils/pbtaDice");
//commands
const rollCommandBuilders_1 = require("../utils/rollCommandBuilders");
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName("roll")
    .setDescription("Rolls dice")
    .addSubcommandGroup(rollCommandBuilders_1.sbrRollCommand)
    .addSubcommand(rollCommandBuilders_1.forgedRollCommand)
    .addSubcommand(rollCommandBuilders_1.customRollCommand)
    .addSubcommand(rollCommandBuilders_1.pbtaRollCommand);
const execute = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isRepliable || !interaction.isChatInputCommand())
        return;
    const rollType = interaction.options.getSubcommandGroup() ||
        interaction.options.getSubcommand();
    let response = new response_1.default();
    switch (rollType) {
        case "custom": {
            const count = interaction.options.getInteger("count");
            const sides = interaction.options.getInteger("sides");
            if (!count || !sides)
                return;
            const dice = (0, rollDice_1.default)(count, sides);
            response.title = dice.max.toString();
            response.description += `Rolled ${count}d${sides} (max: ${dice.max}, min: ${dice.min}).`;
            response.dice = dice.rolls;
            response.status = "full";
            break;
        }
        case "sbr": {
            if (interaction.options.getSubcommand() === "fallout") {
                response = (0, sbrDice_1.falloutTest)();
            }
            else if (interaction.options.getSubcommand() === "check") {
                const pool = interaction.options.getInteger("pool");
                if (!pool)
                    return;
                response = (0, sbrDice_1.skillCheck)(pool);
            }
            break;
        }
        case "forged": {
            const pool = interaction.options.getInteger("pool");
            const rollType = interaction.options.getString("type");
            if (!rollType || !pool)
                return;
            const rollFunctions = {
                action: forgedDice_1.actionRoll,
                resist: forgedDice_1.resistanceRoll,
                fortune: forgedDice_1.fortuneRoll,
                clearStress: forgedDice_1.clearStress,
            };
            response = rollFunctions[rollType](pool);
            break;
        }
        case "pbta": {
            const stat = interaction.options.getInteger("stat");
            if (!stat)
                return;
            response = (0, pbtaDice_1.pbtaRoll)(stat);
            break;
        }
    }
    if (response.description.length === 0)
        response.description = "Placeholder!";
    const colors = {
        critfail: "DarkRed",
        fail: "Red",
        mixed: "Gold",
        full: "Green",
        crit: "Aqua",
    };
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(response.title)
        .setDescription(response.description)
        .addFields({ name: "Rolls", value: response.dice.join(", ") })
        .setColor(colors[response.status]);
    yield interaction.reply({ embeds: [embed] });
});
exports.execute = execute;
