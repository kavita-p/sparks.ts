import { Interaction, SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import rollDice from '../utils/rollDice';
import { skillCheck, falloutTest } from '../utils/sbrDice';
import { actionRoll, fortuneRoll, resistanceRoll } from '../utils/forgedDice';
import customRollCommand from './rollCommands/customRollCommand';
import sbrRollCommand from './rollCommands/sbrRollCommand';
import forgedRollCommand from './rollCommands/forgedRollCommand';

export const data = new SlashCommandBuilder()
  .setName('roll')
  .setDescription('Rolls dice')
  .addSubcommandGroup(sbrRollCommand)
  .addSubcommand(forgedRollCommand)
  .addSubcommand(customRollCommand);

export const execute = async (interaction: Interaction) => {
  if (!interaction.isRepliable || !interaction.isChatInputCommand()) return;
  let rollType =
    interaction.options.getSubcommandGroup() ||
    interaction.options.getSubcommand();
  let response = { text: '', status: '' };
  switch (rollType) {
    case 'custom':
      let count = interaction.options.getInteger('count');
      let sides = interaction.options.getInteger('sides');
      let dice = rollDice(count, sides);
      response.text += `Rolled **${dice.rolls.join(
        ', '
      )}** on ${count}d${sides} (max: ${dice.max}, min: ${dice.min}.)`;
      if (dice.max === sides) response.status = 'full';
      break;
    case 'sbr':
      if (interaction.options.getSubcommand() === 'fallout') {
        response = falloutTest();
      } else if (interaction.options.getSubcommand() === 'check') {
        response = skillCheck(interaction.options.getInteger('pool'));
      }
      break;
    case 'forged':
      let pool = interaction.options.getInteger('pool');
      switch (interaction.options.getString('type')) {
        case 'action':
          response = actionRoll(pool);
          break;
        case 'resist':
          response = resistanceRoll(pool);
          break;
        case 'fortune':
          response = fortuneRoll(pool);
        case 'clearstress':
      }
      break;
  }
  if (response.text.length === 0) response.text = 'Placeholder!';
  let embed = new EmbedBuilder()
    .setTitle(response.status)
    .setAuthor({ name: 'Sparks!' })
    .setDescription(response.text);
  await interaction.reply({ embeds: [embed] });
};
