const fs = require('fs');

module.exports = (client) => {
	client.handleQueue = async () => {
		const time = 5000;
		const queueSearch = () => {
			if (client.queue.length < 2) {
				console.log('No matches');
			} else {
				if (client.queue.length >= 2) {
					const user1 = client.queue.pop();
					const user2 = client.queue.pop();
					console.log(`Match with ${user1} and ${user2}`);
					client.users.send(user1, `<@!${user1}> and <@!${user2}>!.\nYour match will start in 1 minute!`);
					client.users.send(user2, `<@!${user1}> and <@!${user2}>!.\nYour match will start in 1 minute!`);
				}
			}
		};

		setInterval(queueSearch, time);
	};
};
