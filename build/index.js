"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var discord_js_1 = require("discord.js");
// import './utils/types.d.ts';
var config_json_1 = require("./config.json");
var client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
var commands = new discord_js_1.Collection();
var commandsPath = path_1.default.join(__dirname, 'commands');
var commandFiles = fs_1.default
    .readdirSync(commandsPath)
    .filter(function (file) { return file.endsWith('.js'); });
for (var _i = 0, commandFiles_1 = commandFiles; _i < commandFiles_1.length; _i++) {
    var file = commandFiles_1[_i];
    var filePath = path_1.default.join(commandsPath, file);
    var command = require(filePath);
    commands.set(command.data.name, command);
}
var eventsPath = path_1.default.join(__dirname, 'events');
var eventFiles = fs_1.default
    .readdirSync(eventsPath)
    .filter(function (file) { return file.endsWith('.ts'); });
var _loop_1 = function (file) {
    var filePath = path_1.default.join(eventsPath, file);
    var event_1 = require(filePath);
    if (event_1.once) {
        client.once(event_1.name, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return event_1.execute.apply(event_1, args);
        });
    }
    else {
        client.on(event_1.name, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return event_1.execute.apply(event_1, __spreadArray([commands], args, false));
        });
    }
};
for (var _a = 0, eventFiles_1 = eventFiles; _a < eventFiles_1.length; _a++) {
    var file = eventFiles_1[_a];
    _loop_1(file);
}
client.login(config_json_1.token);
