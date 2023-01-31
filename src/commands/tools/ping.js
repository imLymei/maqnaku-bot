const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('You send me ping and i send you pong.'),
	async execute(interaction, client) {
		const message = await interaction.deferReply({
			fetchReply: true,
		});

		const newMessage = `PONG! - ${message.createdTimestamp - interaction.createdTimestamp}ms`;
		await interaction.editReply({ content: newMessage });
	},
};
