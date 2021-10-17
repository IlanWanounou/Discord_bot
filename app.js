const { Client, Intents } = require('discord.js');
const { createAudioPlayer } = require('@discordjs/voice')
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
});
const fs = require('fs');
client.queue = new Map();

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

client.login();
