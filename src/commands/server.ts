import { SlashCommandBuilder, Interaction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("server")
  .setDescription("Replies with server info.");

export const execute = async (interaction: Interaction) => {
  if (!interaction.isRepliable()) return;

  await interaction.reply(
    `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
  );
};
