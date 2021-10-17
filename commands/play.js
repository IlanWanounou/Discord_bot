const { createAudioResource, joinVoiceChannel, createAudioPlayer} = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { joinC } = require('../includes/join');
module.exports = {
    name: 'play',
    async execute(interaction, client) {
        const guild = client.guilds.cache.get(interaction.guild.id);
        const member = guild.members.cache.get(interaction.member.user.id);
        const voiceChannel = member.voice.channel;


        const player = createAudioPlayer()
       joinC(interaction,guild,voiceChannel);

        let resource = createAudioResource(ytdl(interaction.options.get('url').value, {filter: 'audioonly'}));

        player.play(resource);
         interaction.client.connection.subscribe(player)

    }
}
