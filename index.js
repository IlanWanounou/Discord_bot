const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.ALL]});

const fs = require('fs')
const config = require('./config');

client.queue = new Map();

client.on('ready', () => console.log('Connecter !'));

client.login(config.token);

const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

client.on('interaction', async (interaction) => {
    const guild = client.guilds.cache.get(interaction.guild.id)
    const member = guild.members.cache.get(interaction.member.user.id);
    const voiceChannel = member.voice.channel;

try {
    client.connection = ({
        channelId: voiceChannel.id,
        guildId: guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false,
    });
}catch (err) {
   return interaction.reply('Vous n\'est pas dans un channel vocal')
}
    for (const file of commandFiles) {
        let cmd = require(`./commands/${file}`);

        if (cmd.name === interaction.commandName) {
            command = cmd;
        }
    }
    if (command !== null) {
        command.execute(interaction, client);
    }
})


