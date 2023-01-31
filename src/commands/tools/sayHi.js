const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('sayhi').setDescription('Maqnakun say hi!'),
	async execute(interaction, client) {
		const message = await interaction.deferReply({
			fetchReply: true,
		});

		const newMessage = `Hi <@${interaction.user.id}>`;
		await interaction.editReply({ content: newMessage });
	},
};
