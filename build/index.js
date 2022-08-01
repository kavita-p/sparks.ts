var fs = require('node:fs');
var path = require('node:path');
var _a = require('discord.js'), Client = _a.Client, Collection = _a.Collection, GatewayIntentBits = _a.GatewayIntentBits;
var token = require('./config.json').token;
var client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
var commandsPath = path.join(__dirname, 'commands');
var commandFiles = fs
    .readdirSync(commandsPath)
    .filter(function (file) { return file.endsWith('.js'); });
for (var _i = 0, commandFiles_1 = commandFiles; _i < commandFiles_1.length; _i++) {
    var file = commandFiles_1[_i];
    var filePath = path.join(commandsPath, file);
    var command = require(filePath);
    client.commands.set(command.data.name, command);
}
var eventsPath = path.join(__dirname, 'events');
var eventFiles = fs
    .readdirSync(eventsPath)
    .filter(function (file) { return file.endsWith('.js'); });
var _loop_1 = function (file) {
    var filePath = path.join(eventsPath, file);
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
            return event_1.execute.apply(event_1, args);
        });
    }
};
for (var _b = 0, eventFiles_1 = eventFiles; _b < eventFiles_1.length; _b++) {
    var file = eventFiles_1[_b];
    _loop_1(file);
}
client.login(token);
