"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const discord_js_1 = require("discord.js");
const rest_1 = require("@discordjs/rest");
const config_json_1 = require("./config.json");
const commands = [];
const commandsPath = path_1.default.join(__dirname, "commands");
const commandFiles = fs_1.default
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
for (const file of commandFiles) {
    const filePath = path_1.default.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}
const rest = new rest_1.REST({ version: "10" }).setToken(config_json_1.token);
// clear existing global commands
rest
    .put(discord_js_1.Routes.applicationCommands(config_json_1.clientId), { body: [] })
    .then(() => console.log("Successfully deleted all application commands."))
    .catch(console.error);
rest
    .put(discord_js_1.Routes.applicationCommands(config_json_1.clientId), {
    body: commands,
})
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
