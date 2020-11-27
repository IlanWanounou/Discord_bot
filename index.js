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

  } else if (command==="randomnumber") {
    if(!args[0]) return msg.reply("Please select your limit. for example : !randomnumber 0 15");
    if(!args[1]) return msg.reply("You gave only one limit, gives the other.");
    let  min = Math.ceil(args[0]);
    let  max = Math.floor(args[1]);
    let number = Math.floor(Math.random() * (max - min)) + min;



    msg.channel.send(`Okay, find a number betweene ${min} and ${max}`);

    let counter = 0;

    var collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id);

    collector.on('collect', msg => {
         if (msg.content < number) {
             msg.channel.send("it's more");
             counter += 1
         } else if (msg.content > number ) {
             msg.channel.send("it's less");
             counter += 1
         } else if (msg.content == number)  {
           counter += 1
           msg.channel.send(`Well done, you won in ${counter} moves.`)
            return collector.stop();
         } else if (msg.content === "stop") {
  
           msg.channel.send("game stopped")
           return collector.stop();
         } 
       })
  
  }

  })



client.login(token);