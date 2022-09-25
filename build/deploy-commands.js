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
const fs = require("fs");
const path = require("path");
const discord_js_1 = require("discord.js");
const rest_1 = require("@discordjs/rest");
const config_json_1 = require("./config.json");
const deploy = () => __awaiter(void 0, void 0, void 0, function* () {
    const commands = [];
    const commandsPath = path.join(__dirname, "commands");
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = yield Promise.resolve().then(() => require(filePath));
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
});
deploy();
