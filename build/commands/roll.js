"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const discord_js_1 = require("discord.js");
const rollDice_1 = __importDefault(require("../utils/rollDice"));
const sbrDice_1 = require("../utils/sbrDice");
const forgedDice_1 = require("../utils/forgedDice");
const customRollCommand_1 = __importDefault(require("./rollCommands/customRollCommand"));
const sbrRollCommand_1 = __importDefault(require("./rollCommands/sbrRollCommand"));
const forgedRollCommand_1 = __importDefault(require("./rollCommands/forgedRollCommand"));
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName('roll')
    .setDescription('Rolls dice')
    .addSubcommandGroup(sbrRollCommand_1.default)
    .addSubcommand(forgedRollCommand_1.default)
    .addSubcommand(customRollCommand_1.default);
const execute = async (interaction) => {
    if (!interaction.isRepliable || !interaction.isChatInputCommand())
        return;
    let rollType = interaction.options.getSubcommandGroup() ||
        interaction.options.getSubcommand();
    let response = { text: '', status: '' };
    switch (rollType) {
        case 'custom':
            let count = interaction.options.getInteger('count');
            let sides = interaction.options.getInteger('sides');
            let dice = (0, rollDice_1.default)(count, sides);
            response.text += `Rolled **${dice.rolls.join(', ')}** on ${count}d${sides} (max: ${dice.max}, min: ${dice.min}.)`;
            if (dice.max === sides)
                response.status = 'full';
            break;
        case 'sbr':
            if (interaction.options.getSubcommand() === 'fallout') {
                response = (0, sbrDice_1.falloutTest)();
            }
            else if (interaction.options.getSubcommand() === 'check') {
                response = (0, sbrDice_1.skillCheck)(interaction.options.getInteger('pool'));
            }
            break;
        case 'forged':
            let pool = interaction.options.getInteger('pool');
            switch (interaction.options.getString('type')) {
                case 'action':
                    response = (0, forgedDice_1.actionRoll)(pool);
                    break;
                case 'resist':
                    response = (0, forgedDice_1.resistanceRoll)(pool);
                    break;
                case 'fortune':
                    response = (0, forgedDice_1.fortuneRoll)(pool);
                case 'clearstress':
            }
            break;
    }
    if (response.text.length === 0)
        response.text = 'Placeholder!';
    let embed = new discord_js_1.EmbedBuilder()
        .setTitle(response.status)
        .setAuthor({ name: 'Sparks!' })
        .setDescription(response.text);
    await interaction.reply({ embeds: [embed] });
};
exports.execute = execute;
