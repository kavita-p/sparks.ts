"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgedRollCommand = (subcommand) => subcommand
    .setName('forged')
    .setDescription('Rolls a Forged in the Dark roll.')
    .addIntegerOption((option) => option
    .setName('pool')
    .setDescription('The size of your dice pool.')
    .setRequired(true))
    .addStringOption((option) => option
    .setName('type')
    .setDescription("The type of roll you'd like to make.")
    .setRequired(true)
    .addChoices({ name: 'action', value: 'action' }, { name: 'resistance', value: 'resist' }, { name: 'fortune/downtime', value: 'fortune' }, { name: 'clear stress', value: 'clearstress' }));
exports.default = forgedRollCommand;
