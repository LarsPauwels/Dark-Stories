const Discord = require('discord.js');
const Client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const dotenv = require('dotenv');
dotenv.config();

//Controllers
const Command = require('./controllers/command');

/*
	FUNCTIONALITIES
	 * Voice chat Black Stories (with DM)
	 * 2sec horror stories
*/

Client.once('ready', () => {
	console.log('Bot started');

	Command(Client, process.env.GAME, message => {
		console.log('Typed punish');
		Punish(message, Client);
	});

	Command(Client, process.env.STORY, message => {
		console.log('Typed story');
		Punish(message, Client);
	});
});

Client.login(process.env.BOT_TOKEN);
console.log('Bot logged in');