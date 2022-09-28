//builders
import {
  Interaction,
  SlashCommandBuilder,
  EmbedBuilder,
  ColorResolvable,
} from "discord.js";
import { rollDice, RollResponse, ForgedType, RollStatus } from "../utils/lib";
//various dice-based roll utilities
import * as interpreters from "../interpreters/interpreter";
//commands
import * as inputs from "../utils/rollCommandBuilders";

export const data = new SlashCommandBuilder()
  .setName("roll")
  .setDescription("Rolls dice")
  .addSubcommandGroup(inputs.sbrCommand)
  .addSubcommand(inputs.forgedCommand)
  .addSubcommand(inputs.customRollCommand)
  .addSubcommand(inputs.pbtaCommand);

export const execute = async (interaction: Interaction) => {
  if (!interaction.isRepliable || !interaction.isChatInputCommand()) return;
  const rollType =
    interaction.options.getSubcommandGroup() ||
    interaction.options.getSubcommand();

  let response: RollResponse = {
    title: "Command error!",
    description:
      "Some kind of command error has occurred. Please post a comment on Sparks' itch.io page if you encounter this message with as much information as you can provide about the command that produced this result!",
    status: RollStatus.Failure,
    dice: [],
  };

  switch (rollType) {
    case "custom": {
      const count = interaction.options.getInteger("count");
      const sides = interaction.options.getInteger("sides");
      if (
        count === null ||
        count === undefined ||
        sides === null ||
        sides === undefined
      )
        return;
      let rolls;
      if (count <= 0 || sides <= 0) {
        rolls = {
          max: 0,
          min: 0,
          dice: [],
        };
      } else {
        rolls = rollDice(count, sides);
      }
      response = interpreters.customRoll(rolls, count, sides);
      break;
    }
    case "sbr": {
      if (interaction.options.getSubcommand() === "fallout") {
        response = interpreters.falloutTest(rollDice(1, 12));
      } else if (interaction.options.getSubcommand() === "check") {
        const pool = interaction.options.getInteger("pool");
        if (pool === null || pool === undefined) return;
        const rolls = pool === 0 ? rollDice(1, 10) : rollDice(pool, 10);
        response = interpreters.skillCheck(rolls, pool === 0);
      }
      break;
    }
    case "forged": {
      const pool = interaction.options.getInteger("pool");
      const rollType = interaction.options.getString("type") as ForgedType;
      if (
        rollType === null ||
        rollType === undefined ||
        pool === null ||
        pool === undefined
      )
        return;
      const rolls = pool === 0 ? rollDice(2, 6) : rollDice(pool, 6);
      response = interpreters.forgedDice(rolls, rollType, pool === 0);
      break;
    }
    case "pbta": {
      const stat = interaction.options.getInteger("stat");
      if (stat === null || stat === undefined) return;
      const rolls = rollDice(2, 6);
      response = interpreters.pbtaMove(rolls, stat);
      break;
    }
  }

  const colors: { [key in RollStatus]: ColorResolvable } = {
    [RollStatus.Failure]: "Red",
    [RollStatus.Mixed]: "Gold",
    [RollStatus.Full]: "Green",
    [RollStatus.Crit]: "Aqua",
  };

  const embed = new EmbedBuilder()
    .setTitle(response.title)
    .setDescription(response.description)
    .setColor(colors[response.status]);

  if (response.dice.length >= 1) {
    embed.addFields({
      name: "Rolls",
      value: response.dice.join(", "),
    });
  }
  await interaction.reply({ embeds: [embed] });
};
