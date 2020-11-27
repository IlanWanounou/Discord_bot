const Discord = require('discord.js');
const client = new Discord.Client();
const translate = require('@vitalets/google-translate-api');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'ping') {
    msg.reply('Pong!');
  } 
});

const prefix = "!"

client.on('message', msg => {
  const args = msg.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === "translate") {

    

  if(!args[0]) return msg.channel.send("Please give the language and the text to translate.");
  if(!args[1]) return msg.channel.send("Please give the text to translate.");
  let traduction = args.slice(1).join(" ");

  translate(traduction, {to: `${args[0]}`}).then(res => {
    const result = res.text
 
    msg.channel.send(result);




}).catch(err => {
    console.error(err);
});

  }

  })




client.login(token);