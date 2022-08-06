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
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName('roll')
    .setDescription('Rolls dice')
    .addSubcommandGroup((subcommandGroup) => subcommandGroup
    .setName('sbr')
    .setDescription('Rolls for Sparked by Resistance games.')
    .addSubcommand((subcommand) => subcommand
    .setName('check')
    .setDescription('Rolls d10s for a Sparked by Resistance skill check.')
    .addIntegerOption((option) => option
    .setName('pool')
    .setDescription('The size of your dice pool.')
    .setRequired(true)))
    .addSubcommand((subcommand) => subcommand
    .setName('fallout')
    .setDescription('Rolls a Sparked by resistance fallout test.')))
    .addSubcommand((subcommand) => subcommand
    .setName('forged')
    .setDescription('Rolls a Forged in the Dark roll.')
    .addIntegerOption((option) => option
    .setName('pool')
    .setDescription('The size of your dice pool.')
    .setRequired(true))
    .addStringOption((option) => option
    .setName('type')
    .setDescription("The type of roll you'd like to make.")
    .setRequired(true)
    .addChoices({ name: 'action', value: 'action' }, { name: 'resistance', value: 'resist' }, { name: 'fortune/downtime', value: 'fortune' }, { name: 'clear stress', value: 'clearstress' })))
    .addSubcommand((subcommand) => subcommand
    .setName('custom')
    .setDescription('Rolls any number of any sides')
    .addIntegerOption((option) => option
    .setName('count')
    .setDescription("The number of dice you'd like to roll.")
    .setRequired(true))
    .addIntegerOption((option) => option
    .setName('sides')
    .setDescription('The number of sides each die should have.')
    .setRequired(true)));
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
