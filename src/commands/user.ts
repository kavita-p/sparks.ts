import { Interaction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("user")
  .setDescription("Replies with user info.");
export const execute = async (interaction: Interaction) => {
  if (!interaction.isRepliable()) return;
  await interaction.reply(
    `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
  );
};
