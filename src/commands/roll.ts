import { Interaction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('roll')
  .setDescription('Rolls dice')
  .addStringOption((option) =>
    option
      .setName('dice')
      .setDescription("The dice you'd like to roll")
      .setRequired(true)
  );

export const execute = async (interaction: Interaction) => {
  if (!interaction.isRepliable || !interaction.isChatInputCommand()) return;

  const dice = interaction.options.getString('dice');
  let diceArray: any[] = dice.split('d');
  diceArray.forEach(
    (value: string, index: number) => (diceArray[index] = parseInt(value, 10))
  );
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
    let score = Math.max(...results);
    await interaction.reply(
      `You rolled ${score} on ${count}d${sides}! (${results.join(', ')})`
    );
  }
};
