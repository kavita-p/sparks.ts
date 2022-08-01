import fs from 'fs';
import path from 'path';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { token } from './config.json';

interface commandData {
  name: String;
  description: String;
  options: Array<any>;
  default_permission: any;
  default_member_permissions: any;
  dm_permission: Boolean;
}

interface botCommand {
  data: {
    [key: string]: commandData;
  };
}

interface botClient extends Client {
  commands?: Collection<String, botCommand>;
}

const client: botClient = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  console.log(command);
  client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}
client.login(token);
