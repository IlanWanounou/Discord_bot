import * as Discord from 'discord.js';
import * as dotenv from 'dotenv';
import fs from 'fs';

const files = fs.readdirSync('./src/commands').filter((file) => file.endsWith('.js'));

dotenv.config();
const client: Discord.Client = new Discord.Client({
    intents: [Discord.IntentsBitField.Flags.Guilds,
    Discord.IntentsBitField.Flags.GuildMessages]
});

client.on('ready', () => {
    console.log(`Logged in as ${(client.user as Discord.User).tag}!`);
});



client.on('interactionCreate', async (interaction: Discord.Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
        let command = null;
        for (let file of files) {
            command = require(`./src/commands/${file}`);
            if (command.name === interaction.commandName) {
                command?.execute(interaction, client);
            }
        }
    }
});


client.login(process.env.TOKEN);
