import { SlashCommandSubcommandBuilder } from 'discord.js';

const customRollCommand = (subcommand: SlashCommandSubcommandBuilder) =>
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
    );

export default customRollCommand;
