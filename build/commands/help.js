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
const discord_js_1 = require("discord.js");
const fs = require("fs");
const path = require("path");
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName("sparks-help")
    .setDescription("Replies with help for this bot.");
const execute = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isRepliable())
        return;
    const helpPath = path.join(__dirname, "..", "..", "help-text.md");
    const helpText = fs.readFileSync(helpPath, "utf8");
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("Info")
        .setDescription(helpText)
        .addFields({ name: "Author", value: "kavita#7223" })
        .setColor("Blue");
    yield interaction.reply({ embeds: [embed] });
});
exports.execute = execute;
