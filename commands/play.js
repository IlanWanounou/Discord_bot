const {createAudioResource, joinVoiceChannel, createAudioPlayer} = require('@discordjs/voice');
const play = require('play-dl');
const {joinC} = require('../includes/join');
module.exports = {
    name: 'play',
    async execute(interaction, client) {
        const guild = client.guilds.cache.get(interaction.guild.id);
        const member = guild.members.cache.get(interaction.member.user.id);
        const voiceChannel = member.voice.channel;
        const url = interaction.options.get('url').value;
        let yt_info = await play.search(url, { limit : 1 })
        interaction.reply(`Je joue ${yt_info[0].title}`)

        try {
        joinC(interaction, guild, voiceChannel);
        const player = await createAudioPlayer();
        let stream = await play.stream(yt_info[0].url)
            let resource = await createAudioResource(stream.stream);

        await  player.play(resource);
         await interaction.client.connection.subscribe(player);
        } catch (e) {
            console.log(e);
        }

    }
}
