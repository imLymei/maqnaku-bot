const fs = require('fs');

module.exports = (client) => {
	client.handleEvents = async () => {
		// ? Get folders in events dir
		const eventFolder = fs.readdirSync(`./src/events`);

		// ? For each folder in events dir
		for (const folder of eventFolder) {
			// ? Get files that ends with '.js'
			const eventFiles = fs.readdirSync(`./src/events/${folder}`).filter((file) => file.endsWith('.js'));

			// ? For each different folder execute its events
			switch (folder) {
				// ? If folder is 'client'
				case 'client':
					// ? For each javascript file
					for (const file of eventFiles) {
						// ? Get event
						const event = require(`../../events/${folder}/${file}`);

						// ? If event is executed once, execute it
						if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
						else client.on(event.name, (...args) => event.execute(...args, client));
					}
					break;
			}
		}
	};
};
