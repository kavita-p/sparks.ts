"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const discord_js_1 = require("discord.js");
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server info.");
const execute = async (interaction) => {
    if (!interaction.isRepliable())
        return;
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
};
exports.execute = execute;
