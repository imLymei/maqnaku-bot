require('dotenv').config();

const { TOKEN } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

// ? Set discord bot client
const client = new Client({ intents: GatewayIntentBits.Guilds });
// ? Set commands collection
client.commands = new Collection();
// ? Set array for commands
client.commandsArray = [];

client.queue = [];

// ? Get folders inside functions dir
const functionFolder = fs.readdirSync(`./src/functions`);

// ? For every folder in function dir
for (const folder of functionFolder) {
	// ? Get files that end with '.js' inside each folder
	const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter((file) => file.endsWith('.js'));
	// ? Pass a client for each .js file
	for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client);
}

// ? Execute events handler
client.handleEvents();

// ? Execute commands handler
client.handleCommands();

client.handleQueue();

// ? Start bot
client.login(TOKEN);
