"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customRollCommand = (subcommand) => subcommand
    .setName("custom")
    .setDescription("Rolls any number of any sides")
    .addIntegerOption((option) => option
    .setName("count")
    .setDescription("The number of dice you'd like to roll.")
    .setRequired(true))
    .addIntegerOption((option) => option
    .setName("sides")
    .setDescription("The number of sides each die should have.")
    .setRequired(true));
exports.default = customRollCommand;
