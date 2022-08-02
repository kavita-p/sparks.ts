import { SlashCommandBuilder, Interaction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('buzz')
  .setDescription('Replies with Zap!');

export const execute = async (interaction: Interaction) => {
  if (!interaction.isRepliable()) return;
  await interaction.reply('Zap!');
};
