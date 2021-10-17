const {joinVoiceChannel} = require('@discordjs/voice')
function join(interaction, guild, voiceChannel) {


    interaction.client.connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });
}

module.exports={
    joinC: join
}
