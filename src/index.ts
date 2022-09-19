import * as fs from "fs";
import * as path from "path";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import { token } from "./config.json";

const launch = async () => {
  console.log("Morning! Waking up...");

  const client: Client = new Client({ intents: [GatewayIntentBits.Guilds] });

  const commands = new Collection();
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);
    commands.set(command.data.name, command);
  }

  const eventsPath = path.join(__dirname, "events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = await import(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(commands, ...args));
    }
  }
  client.login(token);
};

launch();
