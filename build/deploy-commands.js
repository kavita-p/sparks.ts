var fs = require('node:fs');
var path = require('node:path');
var Routes = require('discord.js').Routes;
var REST = require('@discordjs/rest').REST;
var _a = require('./config.json'), clientId = _a.clientId, token = _a.token;
var commands = [];
var commandsPath = path.join(__dirname, 'commands');
var commandFiles = fs
    .readdirSync(commandsPath)
    .filter(function (file) { return file.endsWith('.js'); });
for (var _i = 0, commandFiles_1 = commandFiles; _i < commandFiles_1.length; _i++) {
    var file = commandFiles_1[_i];
    var filePath = path.join(commandsPath, file);
    var command = require(filePath);
    commands.push(command.data.toJSON());
}
var rest = new REST({ version: '10' }).setToken(token);
// clear existing global commands
rest
    .put(Routes.applicationCommands(clientId), { body: [] })
    .then(function () { return console.log('Successfully deleted all application commands.'); })
    .catch(console.error);
rest
    .put(Routes.applicationCommands(clientId), {
    body: commands,
})
    .then(function () { return console.log('Successfully registered application commands.'); })
    .catch(console.error);
