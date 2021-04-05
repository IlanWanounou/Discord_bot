
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '/';
client.queue = new Map();
client.commands = new Discord.Collection();
const fs = require('fs');
const commandFiles = fs.readdirSync('commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => console.log('READY!'));
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	if (!client.commands.has(command)) return;
	client.commands.get(command).execute(message, args);
});
client.login(token);
