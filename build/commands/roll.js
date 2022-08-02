"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const discord_js_1 = require("discord.js");
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
    await interaction.reply(`Placeholder!`);
};
exports.execute = execute;
