const stories = require('../json/darkStories.json');
const Message = require('./message');
const Discord = require('discord.js');
const Game = require('./game');

const main = async (message) => {
  const story = stories.darkStories[Math.floor(Math.random() * stories.darkStories.length)];
  await Message.createMessage(message, 'Dark Story', "", [
  	{ name: 'What you say to the others', value: story.clue, inline: false },
  	{ name: 'Full story', value: story.awnser, inline: false }
  ], true);

  const sendMessage = await Message.createMessage(message, 'Dark Story', '', [
  	{ name: 'Here is the prompt', value: story.clue, inline: false }
  ]);
  const emoji = await Message.addEmoji(sendMessage, ["⏲️", "✔️", "⏭️"], true);

  if (emoji == "⏲️") {
  	console.log("Timer Clicked");
  	timer(message);
  }

  if (emoji == "✔️") {
  	console.log("Done Clicked");
  	done(message, true);
  }

  if (emoji == "⏭️") {
  	console.log("Next prompt");
  	next(message);
  }
}

async function timer(message) {
	let secondsRemaining = 900,
		 	min = Math.floor(secondsRemaining / 60), 
			sec = secondsRemaining - (min * 60),
			updatedOld;

	const sendMessage = await Message.createMessage(message, '', `${min}:${sec}0`);

	let timer = setInterval(async function() {
		min = Math.floor(secondsRemaining / 60);
		sec = secondsRemaining - (min * 60);

		if (sec < 10) {
			sec = "0" + sec;
		}

    secondsRemaining--;
    let embed = new Discord.MessageEmbed().setDescription(`${min}:${sec}`).setColor('#A51B1B');
    if (!sendMessage.deleted) {
			await sendMessage.edit(embed);
    } else {
    	done(message, false);
    	clearInterval(timer);
    }
  }, 1000);
}

async function done(message, win) {
	if (win) {
		await Message.createMessage(message, 'You win!');
	} else {
		await Message.createMessage(message, 'You lose!');
	}
}

async function next(message) {
	main(message);
}

module.exports = main;