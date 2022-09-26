import { SlashCommandBuilder, Interaction, EmbedBuilder } from "discord.js";
import * as fs from "fs";
import * as path from "path";

export const data = new SlashCommandBuilder()
  .setName("sparks-help")
  .setDescription("Replies with help for this bot.");

export const execute = async (interaction: Interaction) => {
  if (!interaction.isRepliable()) return;

  const helpPath = path.join(__dirname, "..", "..", "help-text.md");

  const helpText = fs.readFileSync(helpPath, "utf8");

  const embed = new EmbedBuilder()
    .setTitle("Info")
    .setDescription(helpText)
    .addFields({ name: "Author", value: "kavita#7223" })
    .setColor("Blue");

  await interaction.reply({ embeds: [embed] });
};
