const stories = require('../json/tshs.json');
const Message = require('./message');

module.exports = async (message) => {
  const story = stories.tshs[Math.floor(Math.random() * stories.tshs.length)];
  const sendMessage = await Message.createMessage(message, 'Mini Horror Story:' , story);
}