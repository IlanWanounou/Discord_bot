const { joinVoiceChannel } = require('@discordjs/voice');
module.exports = {
    name: 'join',
    async execute(interaction, client) {

        const guild = client.guilds.cache.get(interaction.guild.id);
        const member = guild.members.cache.get(interaction.member.user.id);
        const voiceChannel = member.voice.channel;

        const connection= interaction.client.connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        if(connection) return interaction.reply(`J\'ai rejoin ${voiceChannel.name}`)


    }

}

