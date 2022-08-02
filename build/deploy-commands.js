"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var discord_js_1 = require("discord.js");
var rest_1 = require("@discordjs/rest");
var config_json_1 = require("./config.json");
var commands = [];
var commandsPath = path_1.default.join(__dirname, 'commands');
var commandFiles = fs_1.default
    .readdirSync(commandsPath)
    .filter(function (file) { return file.endsWith('.ts') || file.endsWith('.js'); });
for (var _i = 0, commandFiles_1 = commandFiles; _i < commandFiles_1.length; _i++) {
    var file = commandFiles_1[_i];
    var filePath = path_1.default.join(commandsPath, file);
    var command = require(filePath);
    commands.push(command.data.toJSON());
}
var rest = new rest_1.REST({ version: '10' }).setToken(config_json_1.token);
// clear existing global commands
rest
    .put(discord_js_1.Routes.applicationCommands(config_json_1.clientId), { body: [] })
    .then(function () { return console.log('Successfully deleted all application commands.'); })
    .catch(console.error);
rest
    .put(discord_js_1.Routes.applicationCommands(config_json_1.clientId), {
    body: commands,
})
    .then(function () { return console.log('Successfully registered application commands.'); })
    .catch(console.error);
