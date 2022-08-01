module.exports = {
  name: 'interactionCreate',
  async execute(commands, interaction) {
    console.log(`${interaction.user.tag} triggered an interaction.`);
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  },
};
