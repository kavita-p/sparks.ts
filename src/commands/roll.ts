//builders
import {
  Interaction,
  SlashCommandBuilder,
  EmbedBuilder,
  ColorResolvable,
} from "discord.js";
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
import { pbtaRoll } from "../utils/pbtaDice";
//commands
import {
  sbrRollCommand,
  forgedRollCommand,
  customRollCommand,
  pbtaRollCommand,
} from "../utils/rollCommandBuilders";

export const data = new SlashCommandBuilder()
  .setName("roll")
  .setDescription("Rolls dice")
  .addSubcommandGroup(sbrRollCommand)
  .addSubcommand(forgedRollCommand)
  .addSubcommand(customRollCommand)
  .addSubcommand(pbtaRollCommand);

export const execute = async (interaction: Interaction) => {
  if (!interaction.isRepliable || !interaction.isChatInputCommand()) return;
  const rollType =
    interaction.options.getSubcommandGroup() ||
    interaction.options.getSubcommand();
  let response = new RollResponse();
  switch (rollType) {
    case "custom": {
      const count = interaction.options.getInteger("count");
      const sides = interaction.options.getInteger("sides");
      if (!count || !sides) return;
      const dice = rollDice(count, sides);
      response.title = dice.max.toString();
      response.description += `Rolled ${count}d${sides} (max: ${dice.max}, min: ${dice.min}).`;
      response.dice = dice.rolls;
      response.status = "full";
      break;
    }
    case "sbr": {
      if (interaction.options.getSubcommand() === "fallout") {
        response = falloutTest();
      } else if (interaction.options.getSubcommand() === "check") {
        const pool = interaction.options.getInteger("pool");
        if (!pool) return;
        response = skillCheck(pool);
      }
      break;
    }
    case "forged": {
      const pool = interaction.options.getInteger("pool");
      const rollType = interaction.options.getString("type");
      if (!rollType || !pool) return;
      const rollFunctions: { [key: string]: (pool: number) => RollResponse } = {
        action: actionRoll,
        resist: resistanceRoll,
        fortune: fortuneRoll,
        clearStress: clearStress,
      };
      response = rollFunctions[rollType](pool);
      break;
    }
    case "pbta": {
      const stat = interaction.options.getInteger("stat");
      if (!stat) return;
      response = pbtaRoll(stat);
      break;
    }
  }
  if (response.description.length === 0) response.description = "Placeholder!";

  const colors: { [key: string]: ColorResolvable } = {
    critfail: "DarkRed",
    fail: "Red",
    mixed: "Gold",
    full: "Green",
    crit: "Aqua",
  };

  const embed = new EmbedBuilder()
    .setTitle(response.title)
    .setDescription(response.description)
    .addFields({ name: "Rolls", value: response.dice.join(", ") })
    .setColor(colors[response.status]);
  await interaction.reply({ embeds: [embed] });
};
