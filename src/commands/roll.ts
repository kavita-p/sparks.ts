import { Interaction, SlashCommandBuilder } from 'discord.js';
import rollDice from '../utils/rollDice';
import { skillCheck, falloutTest } from '../utils/sbrDice';
import { actionRoll, fortuneRoll, resistanceRoll } from '../utils/forgedDice';

export const data = new SlashCommandBuilder()
  .setName('roll')
  .setDescription('Rolls dice')
  .addSubcommandGroup((subcommandGroup) =>
    subcommandGroup
      .setName('sbr')
      .setDescription('Rolls for Sparked by Resistance games.')
      .addSubcommand((subcommand) =>
        subcommand
          .setName('check')
          .setDescription('Rolls d10s for a Sparked by Resistance skill check.')
          .addIntegerOption((option) =>
            option
              .setName('pool')
              .setDescription('The size of your dice pool.')
              .setRequired(true)
          )
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName('fallout')
          .setDescription('Rolls a Sparked by resistance fallout test.')
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('forged')
      .setDescription('Rolls a Forged in the Dark roll.')
      .addIntegerOption((option) =>
        option
          .setName('pool')
          .setDescription('The size of your dice pool.')
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName('type')
          .setDescription("The type of roll you'd like to make.")
          .setRequired(true)
          .addChoices(
            { name: 'action', value: 'action' },
            { name: 'resistance', value: 'resist' },
            { name: 'fortune/downtime', value: 'fortune' },
            { name: 'clear stress', value: 'clearstress' }
          )
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('custom')
      .setDescription('Rolls any number of any sides')
      .addIntegerOption((option) =>
        option
          .setName('count')
          .setDescription("The number of dice you'd like to roll.")
          .setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName('sides')
          .setDescription('The number of sides each die should have.')
          .setRequired(true)
      )
  );

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
  await interaction.reply(response.text);
};
