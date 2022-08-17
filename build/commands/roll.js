"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
//builders
const discord_js_1 = require("discord.js");
const response_1 = __importDefault(require("../utils/response"));
//various dice-based roll utilities
const rollDice_1 = __importDefault(require("../utils/rollDice"));
const sbrDice_1 = require("../utils/sbrDice");
const forgedDice_1 = require("../utils/forgedDice");
//commands
const rollCommandBuilders_1 = require("../utils/rollCommandBuilders");
const pbtaDice_1 = require("../utils/pbtaDice");
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName("roll")
    .setDescription("Rolls dice")
    .addSubcommandGroup(rollCommandBuilders_1.sbrRollCommand)
    .addSubcommand(rollCommandBuilders_1.forgedRollCommand)
    .addSubcommand(rollCommandBuilders_1.customRollCommand)
    .addSubcommand(rollCommandBuilders_1.pbtaRollCommand);
const execute = async (interaction) => {
    if (!interaction.isRepliable || !interaction.isChatInputCommand())
        return;
    let rollType = interaction.options.getSubcommandGroup() ||
        interaction.options.getSubcommand();
    let response = new response_1.default();
    switch (rollType) {
        case "custom":
            let count = interaction.options.getInteger("count");
            let sides = interaction.options.getInteger("sides");
            let dice = (0, rollDice_1.default)(count, sides);
            response.title = dice.max.toString();
            response.description += `Rolled ${count}d${sides} (max: ${dice.max}, min: ${dice.min}).`;
            response.dice = dice.rolls;
            if (dice.max === sides)
                response.status = "full";
            break;
        case "sbr":
            if (interaction.options.getSubcommand() === "fallout") {
                response = (0, sbrDice_1.falloutTest)();
            }
            else if (interaction.options.getSubcommand() === "check") {
                response = (0, sbrDice_1.skillCheck)(interaction.options.getInteger("pool"));
            }
            break;
        case "forged":
            let pool = interaction.options.getInteger("pool");
            let rollFunctions = {
                action: forgedDice_1.actionRoll,
                resist: forgedDice_1.resistanceRoll,
                fortune: forgedDice_1.fortuneRoll,
                clearStress: forgedDice_1.clearStress,
            };
            let rollType = interaction.options.getString("type");
            response = rollFunctions[rollType](pool);
            break;
        case "pbta":
            let stat = interaction.options.getInteger("stat");
            response = (0, pbtaDice_1.pbtaRoll)(stat);
            break;
    }
    if (response.description.length === 0)
        response.description = "Placeholder!";
    let colors = {
        critfail: "DarkRed",
        fail: "Red",
        mixed: "Gold",
        full: "Green",
        crit: "Aqua",
    };
    let embed = new discord_js_1.EmbedBuilder()
        .setTitle(response.title)
        .setDescription(response.description)
        .addFields({ name: "Rolls", value: response.dice.join(", ") })
        .setColor(colors[response.status]);
    await interaction.reply({ embeds: [embed] });
};
exports.execute = execute;
