import { Client } from "discord.js";

export const name = "ready";
export const once = true;
export const execute = (client: Client) => {
  console.log(`Sparks, ready! Logged in as ${client.user.tag}.`);
};
