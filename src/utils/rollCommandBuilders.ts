import {
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
} from "discord.js";

export const customRollCommand = (subcommand: SlashCommandSubcommandBuilder) =>
  subcommand
    .setName("custom")
    .setDescription("Rolls any number of any sides")
    .addIntegerOption((option) =>
      option
        .setName("count")
        .setDescription("The number of dice you'd like to roll.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("sides")
        .setDescription("The number of sides each die should have.")
        .setRequired(true)
    );

export const forgedRollCommand = (subcommand: SlashCommandSubcommandBuilder) =>
  subcommand
    .setName("forged")
    .setDescription("Rolls a Forged in the Dark roll.")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("The type of roll you'd like to make.")
        .setRequired(true)
        .addChoices(
          { name: "action", value: "action" },
          { name: "resistance", value: "resist" },
          { name: "fortune/downtime", value: "fortune" },
          { name: "clear stress", value: "clearStress" }
        )
    )
    .addIntegerOption((option) =>
      option
        .setName("pool")
        .setDescription("The size of your dice pool.")
        .setRequired(true)
    );

export const sbrRollCommand = (
  subcommandGroup: SlashCommandSubcommandGroupBuilder
) =>
  subcommandGroup
    .setName("sbr")
    .setDescription("Rolls for Sparked by Resistance games.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("check")
        .setDescription("Rolls d10s for a Sparked by Resistance skill check.")
        .addIntegerOption((option) =>
          option
            .setName("pool")
            .setDescription("The size of your dice pool.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("fallout")
        .setDescription("Rolls a Sparked by resistance fallout test.")
    );

export const pbtaRollCommand = (subcommand: SlashCommandSubcommandBuilder) =>
  subcommand
    .setName("pbta")
    .setDescription("Rolls a Powered by the Apocalypse move.")
    .addIntegerOption((option) =>
      option
        .setName("stat")
        .setDescription(
          "The stat you're rolling with, plus any bonuses or negative modifiers."
        )
        .setRequired(true)
    );
