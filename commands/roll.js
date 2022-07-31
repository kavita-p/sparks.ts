const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('roll')
  .setDescription('Rolls dice')
  .addStringOption((option) =>
    option
      .setName('dice')
      .setDescription("The dice you'd like to roll")
      .setRequired(true)
  );

module.exports = {
  data: data,
  async execute(interaction) {
    const dice = interaction.options.getString('input');
    let diceArray = dice.split('d');
    let [count, sides] = diceArray;
    if (
      diceArray.length !== 2 ||
      !Number.isInteger(count) ||
      !Number.isInteger(sides)
    ) {
      await interaction.reply(`Sorry, that's not a valid command!`);
    }
    let results = [];
    for (let i = 0; i < count; i++) {
      results.push = Math.floor(sides * Math.random() + 1);
    }
    let score = Math.max(...results);
    await interaction.reply(
      `You rolled a ${score} on ${count}d${sides}! (${results.join(', ')})`
    );
  },
};
