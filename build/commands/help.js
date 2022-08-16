"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName("sparks-help")
    .setDescription("Replies with help for this bot.");
const execute = async (interaction) => {
    if (!interaction.isRepliable())
        return;
    let helpPath = path_1.default.join(__dirname, "..", "..", "help-text.md");
    let helpText = fs_1.default.readFileSync(helpPath, "utf8");
    let embed = new discord_js_1.EmbedBuilder()
        .setTitle("Info")
        .setDescription(helpText)
        .addFields({ name: "Author", value: "kavita#7223" })
        .setColor("Blue");
    await interaction.reply({ embeds: [embed] });
};
exports.execute = execute;
