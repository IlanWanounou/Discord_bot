const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
const prefix = "!"
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('NzgxOTIwNTE0NDQ4OTQ5MzIw.X8EqOg.-Z64uh-hcHkPg8s8HQu0MC8U_ws');