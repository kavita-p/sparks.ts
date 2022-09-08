//builders
import { Interaction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import RollResponse from "../utils/response";
//various dice-based roll utilities
import rollDice from "../utils/rollDice";
import { skillCheck, falloutTest } from "../utils/sbrDice";
import {
  actionRoll,
  fortuneRoll,
  resistanceRoll,
  clearStress,
} from "../utils/forgedDice";
//commands
import {
  sbrRollCommand,
  forgedRollCommand,
  customRollCommand,
  pbtaRollCommand,
} from "../utils/rollCommandBuilders";
import { pbtaRoll } from "../utils/pbtaDice";

export const data = new SlashCommandBuilder()
  .setName("roll")
  .setDescription("Rolls dice")
  .addSubcommandGroup(sbrRollCommand)
  .addSubcommand(forgedRollCommand)
  .addSubcommand(customRollCommand)
  .addSubcommand(pbtaRollCommand);

export const execute = async (interaction: Interaction) => {
  if (!interaction.isRepliable || !interaction.isChatInputCommand()) return;
  let rollType =
    interaction.options.getSubcommandGroup() ||
    interaction.options.getSubcommand();
  let response = new RollResponse();
  switch (rollType) {
    case "custom":
      let count = interaction.options.getInteger("count");
      let sides = interaction.options.getInteger("sides");
      let dice = rollDice(count, sides);
      response.title = dice.max.toString();
      response.description += `Rolled ${count}d${sides} (max: ${dice.max}, min: ${dice.min}).`;
      response.dice = dice.rolls;
      response.status = "full";
      break;
    case "sbr":
      if (interaction.options.getSubcommand() === "fallout") {
        response = falloutTest();
      } else if (interaction.options.getSubcommand() === "check") {
        response = skillCheck(interaction.options.getInteger("pool"));
      }
      break;
    case "forged":
      let pool = interaction.options.getInteger("pool");
      let rollFunctions = {
        action: actionRoll,
        resist: resistanceRoll,
        fortune: fortuneRoll,
        clearStress: clearStress,
      };
      let rollType = interaction.options.getString("type");
      response = rollFunctions[rollType](pool);
      break;
    case "pbta":
      let stat = interaction.options.getInteger("stat");
      response = pbtaRoll(stat);
      break;
  }
  if (response.description.length === 0) response.description = "Placeholder!";

  let colors = {
    critfail: "DarkRed",
    fail: "Red",
    mixed: "Gold",
    full: "Green",
    crit: "Aqua",
  };

  let embed = new EmbedBuilder()
    .setTitle(response.title)
    .setDescription(response.description)
    .addFields({ name: "Rolls", value: response.dice.join(", ") })
    .setColor(colors[response.status]);
  await interaction.reply({ embeds: [embed] });
};
