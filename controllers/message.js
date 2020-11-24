const Discord = require('discord.js');

async function createMessage(message, text, desc = "", fields = []) {
	let newMessage = new Discord.MessageEmbed()
		.setColor('#ff0000')
		.setTitle(text)
		.setDescription(desc)
		.setTimestamp()
		.setFooter(`React with ❌ to delete this post.`);

	for (var i = 0; i < fields.length; i++) {
		newMessage.addFields(
			fields[i]
		)
	}

	const sendMessage = await message.channel.send(newMessage);
	await addDeleteEmoji(sendMessage);
	return sendMessage;
}

async function addDeleteEmoji(message) {
	await addEmoji(message, ["❌"]);
}

async function addEmoji(message, icons, waitReact = false) {
	for (const reaction of icons) await message.react(reaction);
	if (waitReact) {
		const filter = (reaction, user) => icons.includes(reaction.emoji.name) && (!user.bot);

		return message
	    .awaitReactions(filter, {
	        max: 1
	    })
	    .then(collected => collected.first() && collected.first().emoji.name);
	}
}

async function checkReaction(reaction, user) {
	if (user.bot) return;
	if (reaction.emoji.name === "❌") {
		reaction.message.delete();
	}
}

module.exports = { createMessage: createMessage, addEmoji: addEmoji, checkReaction: checkReaction };