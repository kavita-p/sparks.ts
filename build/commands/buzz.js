"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const discord_js_1 = require("discord.js");
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName("buzz")
    .setDescription("Replies with Zap!");
const execute = async (interaction) => {
    if (!interaction.isRepliable())
        return;
    await interaction.reply("Zap!");
};
exports.execute = execute;
