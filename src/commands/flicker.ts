import { SlashCommandBuilder, Interaction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("flicker")
  .setDescription("Replies with Hum.");

export const execute = async (interaction: Interaction) => {
  if (!interaction.isRepliable()) return;
  await interaction.reply("Hummmmmmmmmm...");
};
