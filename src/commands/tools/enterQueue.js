const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('enterqueue').setDescription('Enter Matchmaking queue'),
	async execute(interaction, client) {
		const message = await interaction.deferReply({
			fetchReply: true,
			ephemeral: true,
		});

		let isIn = false;

		for (const name of client.queue) {
			if (name === interaction.user.id) {
				isIn = true;
			}
		}

		// const newMessage = `checking...`;
		// await interaction.editReply({ content: newMessage });
		interaction.deleteReply();

		if (isIn) {
			message.channel.send(`<@!${interaction.user.id}> you already are at the queue!`);
		} else {
			client.queue.push(interaction.user.id);
			message.channel.send(`<@!${interaction.user.id}> you are at the queue!`);
		}

		console.log(client.queue);
	},
};
