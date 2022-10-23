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
        .setMinValue(0)
    )
    .addIntegerOption((option) =>
      option
        .setName("sides")
        .setDescription("The number of sides each die should have.")
        .setRequired(true)
        .setMinValue(0)
    );

export const forgedCommand = (subcommand: SlashCommandSubcommandBuilder) =>
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
          { name: "clear stress", value: "clear" }
        )
    )
    .addIntegerOption((option) =>
      option
        .setName("pool")
        .setDescription("The size of your dice pool.")
        .setRequired(true)
        .setMinValue(0)
    );

export const sbrCommand = (
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
            .setMinValue(0)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("fallout")
        .setDescription("Rolls a Sparked by resistance fallout test.")
    );

export const pbtaCommand = (subcommand: SlashCommandSubcommandBuilder) =>
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

    export const wildCommand = (subcommand: SlashCommandSubcommandBuilder) =>
    subcommand    
        .setName("wild")
        .setDescription("Rolls a Wild Words roll.")
        .addStringOption((option) =>
        option
            .setName("type")
            .setDescription("The type of roll you'd like to make.")
            .setRequired(true)
            .addChoices(
                { name: "Action", value: "Action"},
                { name: "Attack", value: "Attack"},
                { name: "Defense", value: "Defense"},
                { name: "Resource", value: "Resource"},
                { name: "Creation", value: "Creation"},
                { name: "Recovery", value: "Recovery"},
                { name: "Ratings", value: "Ratings"},
                { name: "Watch", value: "Watch"},
                { name: "Weather-watching", value: "Weather-watching"}
            )
          )
          .addIntegerOption((option) =>
          option
            .setName("pool")
            .setDescription("The size of your dice pool.")
            .setRequired(true)
            .setMinValue(0)
            .setMaxValue(6)
          )
  
          .addIntegerOption((option) =>
          option
            .setName("cut")
            .setDescription("The number of results to remove from the result pool, starting from the highest.")
            .setRequired(false)
            .setMinValue(0)
            .setMaxValue(6)
        ); 
      