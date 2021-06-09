const Discord = require('discord.js');
const client = new Discord.Client();
/*const prefix = '/';
client.queue = new Map();

client.commands = new Discord.Collection();*/

const listCommands = require('./commands');
/*const fs = require('fs');
const commandFiles = fs.readdirSync('commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	if (!client.commands.has(command)) return;
	client.commands.get(command).execute(message, args);
});*/
client.slash = new Discord.Collection();

client.on('message', async message => {

    slcommands.set(listCommands.name, listCommands);

})

client.ws.on("INTERACTION_CREATE", async interaction => {
    if (!client.slcommands.has(interaction.data.name)) return;
    try {
        client.slcommands.get(interaction.data.name).execute(interaction);
    } catch (error) {
        console.log(
            `Error from command ${interaction.data.name} : ${error.message}`
        );
        console.log(`${error.stack}\n`);
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "Error!"
                }
            }
        });
    }

client.on('ready', () => console.log('On'));


client.login("NzgxOTIwNTE0NDQ4OTQ5MzIw.X8EqOg.gxlQKBAcD--8TGLLHPA-Epdod8k");

