const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { createAudioPlayer } = require('@discordjs/voice');
const fs = require('fs');

const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));


client.on('interactionCreate', async interaction => {
    let command;
        for (const file of commandFiles) {
            let fileCheck = require(`./commands/${file}`);
            if (fileCheck.name === interaction.commandName) {
                command = fileCheck;
            }
        }
        if (command !== null) {
            command.execute(interaction, client);
        }
    });


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.login('NzgxOTIwNTE0NDQ4OTQ5MzIw.X8EqOg.FLMGKVr1rsAsVPa_Yip-vnotvJ8');
