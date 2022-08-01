const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flicker')
    .setDescription('Replies with Hum.'),
  async execute(interaction) {
    await interaction.reply('Hummmmmmmmmm');
  },
};
