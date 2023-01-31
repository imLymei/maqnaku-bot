const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = (client) => {
	client.handleCommands = async () => {
		// ? Get folder in command dir
		const commandFolders = fs.readdirSync('./src/commands');

		// ? For each folder in command dir
		for (const folder of commandFolders) {
			// ? Get files that end with '.js'
			const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith('.js'));

			// ? Import commands and commandsArray from client
			const { commands, commandsArray } = client;

			//? For each command file
			for (const file of commandFiles) {
				// ? Get command
				const command = require(`../../commands/${folder}/${file}`);

				// ? Set command name and script
				commands.set(command.data.name, command);

				// ? Add command to commandsArray in client
				commandsArray.push(command.data.toJSON());

				// ? Send console message of success
				console.log(`Command: ${command.data.name} has been passed true handler`);
			}
		}

		const clientID = process.env.CLIENT_ID;
		const guildID = process.env.TEST_GUILD_ID;
		const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

		try {
			const { commands, commandsArray } = client;
			console.log('Refreshing application (/) commands...');

			await rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commandsArray });

			console.log('Reloaded application (/) command.');
		} catch (error) {
			console.log(error);
		}
	};
};
