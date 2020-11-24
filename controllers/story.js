const stories = require('../json/tshs.json');
const Message = require('./message');

module.exports = async (message) => {
  const story = stories.random[Math.floor(Math.random() * stories.random.length)];
  const sendMessage = await Message.createMessage(message, 'Mini Horror Story:' , story);
}