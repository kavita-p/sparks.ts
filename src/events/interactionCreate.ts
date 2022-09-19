import { Collection, Interaction, SlashCommandBuilder } from "discord.js";

export const name = "interactionCreate";
export const execute = async (
  commands: Collection<
    string,
    { data: SlashCommandBuilder; execute: (interaction: Interaction) => void }
  >,
  interaction: Interaction
) => {
  console.log(`${interaction.user.tag} triggered an interaction.`);
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) return;

  try {
    command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
};
