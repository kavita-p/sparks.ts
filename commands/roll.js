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

const execute = async (interaction) => {
  const dice = interaction.options.getString('dice');
  let diceArray = dice.split('d');
  diceArray.forEach((value, index) => (diceArray[index] = parseInt(value, 10)));
  let [count, sides] = diceArray;
  if (
    diceArray.length !== 2 ||
    !Number.isInteger(count) ||
    !Number.isInteger(sides)
  ) {
    await interaction.reply(`Sorry, that's not a valid command!`);
  } else {
    let results = [];
    for (let i = 0; i < count; i++) {
      results.push(Math.floor(sides * Math.random() + 1));
    }
    console.log(results);
    let score = Math.max(...results);
    await interaction.reply(
      `You rolled ${score} on ${count}d${sides}! (${results.join(', ')})`
    );
  }
};

module.exports = {
  data,
  execute,
};
