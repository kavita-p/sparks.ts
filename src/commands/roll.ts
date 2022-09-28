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
      if (!count || !sides) return;
      const rolls = rollDice(count, sides);
      response = interpreters.customRoll(rolls, count, sides);
      break;
    }
    case "sbr": {
      if (interaction.options.getSubcommand() === "fallout") {
        response = interpreters.falloutTest(rollDice(1, 12));
      } else if (interaction.options.getSubcommand() === "check") {
        const pool = interaction.options.getInteger("pool");
        if (!pool && pool !== 0) return;
        const [zeroD, rolls] =
          pool === 0 ? [true, rollDice(1, 10)] : [false, rollDice(pool, 10)];
        response = interpreters.skillCheck(rolls, zeroD);
      }
      break;
    }
    case "forged": {
      const pool = interaction.options.getInteger("pool");
      const rollTypeKey = interaction.options.getString("type");
      if (!rollTypeKey || !pool) return;
      const rollType = rollTypeKey as ForgedType;
      const rolls = pool === 0 ? rollDice(2, 6) : rollDice(pool, 6);
      response = interpreters.forgedDice(rolls, rollType, pool === 0);
      break;
    }
    case "pbta": {
      const stat = interaction.options.getInteger("stat");
      if (!stat) return;
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
    .addFields({ name: "Rolls", value: response.dice.join(", ") })
    .setColor(colors[response.status]);
  await interaction.reply({ embeds: [embed] });
};
