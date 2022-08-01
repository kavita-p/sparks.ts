const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('buzz')
    .setDescription('Replies with Zap!'),
  async execute(interaction) {
    await interaction.reply('Zap!');
  },
};
