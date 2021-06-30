module.exports = {
    name: 'leave',
    execute(interaction, client) {
        const guild = client.guilds.cache.get(interaction.guild.id)
        const member = guild.members.cache.get(interaction.member.user.id);
        const voiceChannel = member.voice.channel;
        const connection = interaction.client.connection.destroy()
    }

}
