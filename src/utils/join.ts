const {joinVoiceChannel} =  require('@discordjs/voice')

export function join(interaction, guild, voiceChannel) {

    interaction.client.connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });
}