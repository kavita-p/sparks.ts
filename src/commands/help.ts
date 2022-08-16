import { SlashCommandBuilder, Interaction, EmbedBuilder } from "discord.js";
import fs from "fs";
import path from "path";

export const data = new SlashCommandBuilder()
  .setName("sparks-help")
  .setDescription("Replies with help for this bot.");

export const execute = async (interaction: Interaction) => {
  if (!interaction.isRepliable()) return;

  let helpPath = path.join(__dirname, "..", "..", "help-text.md");

  let helpText = fs.readFileSync(helpPath, "utf8");

  let embed = new EmbedBuilder()
    .setTitle("Info")
    .setDescription(helpText)
    .addFields({ name: "Author", value: "kavita#7223" })
    .setColor("Blue");

  await interaction.reply({ embeds: [embed] });
};
