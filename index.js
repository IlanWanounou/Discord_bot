const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.ALL]});

const { createAudioPlayer } = require('@discordjs/voice')

const fs = require('fs')
const config = require('./config');

client.queue = new Map();
client.player = createAudioPlayer;
client.connection;

client.on('ready', () => console.log('Connecter !'));

client.login(config.token);

const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

client.on('interaction', async (interaction) => {
    const guild = client.guilds.cache.get(interaction.guild.id);
    const member = guild.members.cache.get(interaction.member.user.id);

    for (const file of commandFiles) {
        let cmd = require(`./commands/${file}`);

        if (cmd.name === interaction.commandName) {
            command = cmd;
        }
    }
    if (command !== null) {
        command.execute(interaction, client);
        console.log(`${member.user.username} à utliser la commande ${interaction.commandName} sur le serveur :  ${guild.name}`)
    }
})


