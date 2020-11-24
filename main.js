const Discord = require('discord.js');
const Client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const dotenv = require('dotenv');
dotenv.config();

//Controllers
const Command = require('./controllers/command');
const Game = require('./controllers/game');
const Story = require('./controllers/story');

/*
	FUNCTIONALITIES
	 * Voice chat Black Stories (with DM)
	 * 2sec horror stories
*/

Client.once('ready', () => {
	console.log('Bot started');

	Command(Client, process.env.GAME, message => {
		console.log('Typed game');
		Game(message);
	});

	Command(Client, process.env.STORY, message => {
		console.log('Typed story');
		Story(message);
	});
});

Client.login(process.env.BOT_TOKEN);
console.log('Bot logged in');